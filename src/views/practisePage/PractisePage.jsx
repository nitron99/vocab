import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Avatar,
  IconButton,
  LinearProgress
} from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useDB } from '../../contexts/firebaseDb';

import styles from "../../global.scss";
import "./styles.scss";

const PractisePage = () => {
  const { wordsList } = useDB();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    console.log(wordsList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handlePrevious = () => {
    if(index > 0) {
      setReveal(false);
      setIndex(index - 1);
    }
  }

  const handleNext = () => {
    if(index !== wordsList.length -1){
      setReveal(false);
      setIndex(index + 1);
    }else{
      navigate("/home");
    }
  }

  const normalise = (value) => ((value - 0) * 100) / ((wordsList.length - 1) - 0);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ 
        height: "72px", 
        gap: "50px", 
        backgroundColor: styles['bg_secondary'],
        borderBottom: "solid 1px #303644" }}>
        <Container maxWidth="md">
          <Box
            pt={1}
            className="flexCenterSBRow">
            <Typography 
              variant='h4' 
              color={"white"}
              fontWeight={700}>
                Vocab.
            </Typography>
            <Box sx={{ gap: "20px" }} className="flexCenter_Row">
              <IconButton
                onClick={() => {
                  
                }}>
                <Avatar
                  alt={JSON.parse(localStorage.getItem("auth"))?.displayName}
                  src={JSON.parse(localStorage.getItem("auth"))?.photoURL} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container 
        maxWidth="md">
        <Box
          sx={{ height: "100%" }}
          pt={2} pb={2}>
          <LinearProgress 
            variant="determinate"
            value={normalise(index)}
            min
            color='secondary'
            sx={{ height: "10px", borderRadius: "12px" }}/>

          <Box 
            className='create__card'
            sx={{ height: "calc(100vh - 220px)"}}
            mb={2}>
            <Typography
              variant='h3'
              align='center'
              mb={3}>
              {wordsList[index].title}
            </Typography>
            {
              reveal
              ?
              <Typography
                variant='h4'
                align='center'>
                {wordsList[index].content}
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
              {index + 1}/{wordsList.length}
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