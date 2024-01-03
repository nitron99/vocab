/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GestureDetector } from 'react-onsenui';

import { 
  Container, 
  Typography, 
  Box, 
  Button,
  LinearProgress
} from '@mui/material';

import TopBar from '../../components/topBar/TopBar';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useDB } from '../../contexts/firebaseDb';

import "./styles.scss";

const PractisePage = () => {
  const { booksList } = useDB();
  const params = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [shuffledArray, setShuffledArray] = useState([]);

  useEffect(() => {
    let arr = [];

    //decide the array
    if("id" in params){
      // specific
      arr = booksList.find(i => i.id == params.id).words
    }else {
      // all
      booksList.forEach(i => console.log(i));
      booksList.forEach(i => {
        if("words" in i){
          arr.push(...i.words);
        }
      });
    }

    // shuffle array
    setShuffledArray(shuffle(arr));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevious = () => {
    if(index > 0) {
      setReveal(false);
      setIndex(index - 1);
    }
  }

  const handleNext = () => {
    if(index !== shuffledArray.length -1){
      setReveal(false);
      setIndex(index + 1);
    }else{
      navigate("/home");
    }
  }

  const normalise = (value) => ((value - 0) * 100) / ((shuffledArray.length - 1) - 0);

  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TopBar />
      <Container 
        maxWidth="md">
        <Box className="flexCenterSBRow" mt={2}>
          {
            "id" in params
            ?
            <Typography
              variant='h6'
              fontFamily={'Noto Sans, sans-serif'}
              color="white">
              { booksList.find(i => i.id == params.id)?.name}
            </Typography>
            :
            <Typography
              variant='h6'
              fontFamily={'Noto Sans, sans-serif'}
              color="white">
              All words
            </Typography>
          }

          <Typography
            variant='h6'
            fontFamily={'Noto Sans, sans-serif'}
            color="white">
            {index + 1}/{shuffledArray.length}
          </Typography>
        </Box>
        <Box
          sx={{ height: "100%" }}
          pt={2} pb={2}>
          <LinearProgress 
            variant="determinate"
            value={normalise(index)}
            color='secondary'
            sx={{ height: "10px", borderRadius: "12px" }}/>
          <GestureDetector
            onTap={() => setReveal(true)}
            onHold={() => setReveal(true)}
            onSwipeLeft={handleNext}
            onSwipeRight={handlePrevious}>
            <Box
              className='create__card'
              sx={{ height: "calc(100vh - 320px)"}}
              mb={2}
              p={4}>
              <Typography
                fontFamily={'Noto Sans, sans-serif'} 
                variant='h3'  
                mb={10}
                align='center'>
                {shuffledArray[index]?.title}
              </Typography>
              {
                reveal
                ?
                <Typography
                  fontFamily={'Noto Sans, sans-serif'}
                  variant='h4'
                  align='center'>
                  {shuffledArray[index]?.content}
                </Typography>
                :
                <Box
                  className="flexCenterCenterRow">
                  <Button
                    variant='outlined'
                    color='secondary'
                    size="large"
                    onClick={() => setReveal(true)}>
                    Show
                  </Button>
                </Box>
              }
            </Box>
          </GestureDetector>
          <Box
            className='flexCenterSBRow'>
            <Button
              color="info"
              variant='outlined'
              startIcon={<ChevronLeftIcon />}
              onClick={handlePrevious}>
              Prev
            </Button>
            <Button
              color='success'
              variant='outlined'
              endIcon={<NavigateNextIcon />}
              onClick={handleNext}>
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default PractisePage;