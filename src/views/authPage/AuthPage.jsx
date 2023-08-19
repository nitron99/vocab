import React from 'react';

import { useAuth } from  '../../contexts/authContext';

const AuthPage = () => {
  const { googleSignUp } = useAuth();

  const handleLogin = () => {
    googleSignUp();
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default AuthPage