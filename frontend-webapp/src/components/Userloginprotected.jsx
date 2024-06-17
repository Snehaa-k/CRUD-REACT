import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Userloginprotected = ({ children }) => {
  const token = localStorage.getItem('access_token'); 
  const location = useLocation();
  const isAuthenticated =!!token;

  if (isAuthenticated) {

    return <Navigate to="/home" state={{ from: location }} />;
  }
  if (!isAuthenticated) {
    
    return children;
  }
 
};

export default Userloginprotected;
