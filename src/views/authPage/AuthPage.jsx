import React from 'react';

import { 
  Container, 
  Typography, 
  Box, 
  Button
} from '@mui/material';

import { useAuth } from  '../../contexts/authContext';

const AuthPage = () => {
  const { googleSignUp } = useAuth();

  const handleLogin = () => {
    googleSignUp();
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box
          className='flexCenterCenterColumn'
          sx={{ minHeight: "100vh", gap: "50px" }}>
          <Typography 
            color="white"
            align='center'
            variant='h1'
            fontWeight={700}>
            Vocab.
          </Typography>

          <Button 
            variant="outlined" 
            onClick={handleLogin} 
            size="lg"
            sx={{ width: "120px" }}>
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default AuthPage;