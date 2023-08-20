import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Avatar,
  IconButton
} from '@mui/material';

import { useAuth } from  '../../contexts/authContext';
import { useDB } from '../../contexts/firebaseDb';

import styles from "../../global.scss";
import "./styles.scss";

const HomePage = () => {
  const { logout } = useAuth();
  const { 
    getAllWords,
    createWord,
    wordsList
  } = useDB();

  const navigate = useNavigate();

  useEffect(() => {
    getAllWords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleLogout = () => {
    logout();
  }

  const handleCreate = () => {
    let obj = {
      title: "test2",
      content: "testContent2",
      createdAt: new Date(),
      updatedAt: null,
    }
    createWord(obj);
  }

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
              <Button 
                variant='outlined'
                onClick={() => navigate("/create")}>
                Create
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => navigate("/practise")}>
                Practise
              </Button>
              <IconButton
                onClick={() => {
                  logout();
                }}>
                <Avatar
                  alt={JSON.parse(localStorage.getItem("auth"))?.displayName}
                  src={JSON.parse(localStorage.getItem("auth"))?.photoURL} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
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