import React from 'react';

import { 
  Container, 
  Typography, 
  Box,
  Avatar,
  IconButton
} from '@mui/material';

import { useAuth } from  '../../contexts/authContext';

import styles from "../../global.scss";
import { useDB } from '../../contexts/firebaseDb';

const TopBar = () => {
  const { logout } = useAuth();
  const { clearBooksList } = useDB();

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
            fontFamily={'Noto Sans, sans-serif'}
            fontWeight={700}>
              Vocab.
          </Typography>
          <Box sx={{ gap: "10px" }} className="flexCenter_Row">
            <IconButton
              sx={{ padding: 0 }}
              onClick={() => {
                logout();
                clearBooksList();
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