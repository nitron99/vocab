import React, { useEffect } from 'react';

import { 
  Container, 
  Typography, 
  Box
} from '@mui/material';

import TopBar from '../../components/topBar/TopBar';

import { useDB } from '../../contexts/firebaseDb';

import "./styles.scss";

const HomePage = () => {
  const { 
    getAllWords,
    wordsList
  } = useDB();

  useEffect(() => {
    getAllWords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TopBar />
      <Container maxWidth="md">
        <Box pt={2}>
          <Typography 
            variant='h5'
            color={"white"}>
            Total Words - {wordsList.length}  
          </Typography>
        </Box>
        <Box
          sx={{ 
            overflow: "auto",
            height: "calc(100vh - 150px)",
            marginTop: "20px" }}>
        {
          wordsList.map((item, index) => (
            <Box key={index}
              className="word__card flexCenter_Row">
              <Typography 
                variant='body1'>
                {item.id + 1}.&nbsp;{item.title}
              </Typography>
              <Typography 
                variant='body2'
                fontWeight={300}>
                &nbsp;-&nbsp;{item.content}
              </Typography>
            </Box>
          ))
        }
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage