import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';




const Userlistprotected = ({ children }) => {
    const atoken = localStorage.getItem('admin_access_token')
    const location = useLocation();
   
    const isAdAuth = !!atoken;
  
    
    if(!isAdAuth){
      return <Navigate to="/adlogin" state={{ from: location }} />;
    }
    if(isAdAuth){
      return children;
    }
  
    
  };
  
  export default Userlistprotected;