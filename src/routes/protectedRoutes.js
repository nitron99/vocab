import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../contexts/authContext';

const UseAuthicator = () => {
  const { currentUser } = useAuth();
  console.log(currentUser)
  if (currentUser) {
    return true;
  } else {
    return false;
  }
};
  

const protectedRoutes = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = UseAuthicator();

  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default protectedRoutes