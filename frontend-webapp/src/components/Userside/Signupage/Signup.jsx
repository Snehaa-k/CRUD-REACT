import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import './Signup.css'
import { register } from '../../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({register}) => {
 const [username, setusername] = useState('');
 const [email, setemail] = useState('');
 const [password, setpassword] = useState('');
 const [password2, setpassword2] = useState('');
 const navigate = useNavigate()
 const dispatch = useDispatch()
  

 
 const handlesubmit = async (e) => {
  e.preventDefault();
  if (!username.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Username cannot be empty or contain spaces.',
    });
    setusername('');
    
    return; 
  }
  if(password!=password2){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Passwords do not match!',
    });
    setpassword('');
    setpassword2('');
    return
  }
  
  try{
    const res = await axios.post('http://127.0.0.1:8000/signup/',{username,email,password,password2});
    console.log(res.data);
    if(res.data.message = "User created successfully"){
      alert('you registered succefully')
      navigate('/');
    
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data,
    });
  }
}catch (err) {
    console.log(err);
  }
    
    
  
 }
  return (
    <>
     <div className="signup-container  pb-4 ">
    <h2 className='text-black'>SIGN UP</h2>
    <br/>
   
    <form  onSubmit={handlesubmit}>
   
    <div className="mb-3">
   
        <input type="text" class="form-control " value={username}  onChange={(e)=>{setusername(e.target.value)}} placeholder= 'Enter Your Name' id="exampleInputEmail1" v-model="email" required/><br/>
      </div>
      <div className="mb-3">
        <input type="email"  value={email} onChange={(e)=>{setemail(e.target.value)}} class="form-control"  placeholder= 'Enter Your Email' id="exampleInputtext" v-model="email" required/><br/>
      </div>
      <div className="mb-3">
        <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder='Enter Your password'  v-model="password1" required/><br/>
      </div>
      
      <div className="mb-3">
      <input type="password" value={password2} onChange={(e)=>{setpassword2(e.target.value)}} className="form-control" id="exampleInputPassword2" placeholder='Confirm  Password'  v-model="password2" required/><br/>
      </div>
      
      <button type="submit" className="btn btn-outline-warning">SUBMIT</button>
    </form>
  </div>
  <style jsx>{`
       .signup-container {
          background-color: rgba(255, 255, 255, 0.5); 
          padding: 67px 35px;
          border-radius: 10px;
        }
        .form-control {
          background-color: transparent;
          border: 3px solid #ccc; /* Add border for better visibility */
          padding: 10px;
          color: black !important; /* Ensure text color is black */     
        }
        .form-control::placeholder {
          color: rgba(0, 0, 0, 0.5); /* Placeholder text color */
        }
        .form-control:focus {
          background-color: transparent; /* Keep input background transparent when focused */
          color: black !important; /* Ensure text color is black */          outline: none; /* Remove default focus outline */
          border-color: #fff; /* Change border color on focus */
        }
        
      `}</style>
   
    </>
  )
}

export default connect(null, { register })(Signup);