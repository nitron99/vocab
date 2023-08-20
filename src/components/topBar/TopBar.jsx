import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Avatar,
  IconButton
} from '@mui/material';

import { useAuth } from  '../../contexts/authContext';

import styles from "../../global.scss";

const TopBar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ 
      height: "72px", 
      gap: "50px", 
      backgroundColor: styles['bg_secondary'],
      borderBottom: "solid 1px #303644" }}>
      <Container maxWidth="md">
        <Box
          sx={{ height: "72px" }}
          className="flexCenterSBRow">
          <Typography 
            variant='h5' 
            color={"white"}
            fontWeight={700}>
              Vocab.
          </Typography>
          <Box sx={{ gap: "10px" }} className="flexCenter_Row">
            {
              location.pathname === "/home"
              &&
              <Button 
                variant='outlined'
                onClick={() => navigate("/create")}>
                Create
              </Button>
            }
            {
              location.pathname === "/home"
              &&
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => navigate("/practise")}>
                Practise
              </Button>
            }
            <IconButton
              sx={{ padding: 0 }}
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
  )
}

export default TopBar