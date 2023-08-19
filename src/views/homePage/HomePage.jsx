import React from 'react';

import { useAuth } from  '../../contexts/authContext';

const HomePage = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }


  return (
    <div>
      HomePage
      <br/>
      <button
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default HomePage