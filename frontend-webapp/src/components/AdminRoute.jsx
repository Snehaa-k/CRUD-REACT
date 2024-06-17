import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Adminprotected = ({ children }) => {
  const token = localStorage.getItem('access_token'); 
  const atoken = localStorage.getItem('admin_access_token')
  const location = useLocation();
  const isAuthenticated =!!token;
  const isAdAuth = !!atoken;

  if (isAuthenticated  ) {
    // console.log(isAuthenticated);
    return <Navigate to="/" state={{ from: location }} />;
  }
  if (!isAuthenticated) {
    // console.log(isAuthenticated);
    return children;  }

  if(isAdAuth){
    return <Navigate to="/userlist" state={{ from: location }} />;
  }
  if(!isAdAuth){
    return children;
  }

  
};

export default Adminprotected;