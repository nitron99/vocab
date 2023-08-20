import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { wordsList } = useDB();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [shuffledArray, setShuffledArray] = useState([]);

  useEffect(() => {
    setShuffledArray(shuffle(wordsList));
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
        <Box
          sx={{ height: "100%" }}
          pt={2} pb={2}>
          <LinearProgress 
            variant="determinate"
            value={normalise(index)}
            color='secondary'
            sx={{ height: "10px", borderRadius: "12px" }}/>
          <GestureDetector
            onSwipeLeft={handleNext}
            onSwipeRight={handlePrevious}>
            <Box
              className='create__card'
              sx={{ height: "calc(100vh - 225px)"}}
              mb={2}>
              <Typography
                variant='h3'
                align='center'
                mb={3}>
                {shuffledArray[index]?.title}
              </Typography>
              {
                reveal
                ?
                <Typography
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
              Previous
            </Button>
            <Typography
              variant='body2'
              color="white">
              {index + 1}/{shuffledArray.length}
            </Typography>
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