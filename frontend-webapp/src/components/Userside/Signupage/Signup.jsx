import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import './Signup.css'
import { register } from '../../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({register}) => {
 const [username, setusername] = useState('');
 const [email, setemail] = useState('');
 const [password1, setpassword1] = useState('');
 const [password2, setpassword2] = useState('');
 const navigate = useNavigate()
 const dispatch = useDispatch()
 
 const handlesubmit = async (e) => {
  e.preventDefault();
  
  try{
    const res = await axios.post('http://127.0.0.1:8000/signup/',{username,email,password1,password2});
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
    <h2>SIGN UP</h2>
    <br/>
   
    <form  onSubmit={handlesubmit}>
   
    <div className="mb-3">
   
        <input type="text" class="form-control" value={username}  onChange={(e)=>{setusername(e.target.value)}} placeholder= 'Enter Your Name' id="exampleInputEmail1" v-model="email" required/><br/>
      </div>
      <div className="mb-3">
        <input type="email"  value={email} onChange={(e)=>{setemail(e.target.value)}} class="form-control"  placeholder= 'Enter Your Email' id="exampleInputtext" v-model="email" required/><br/>
      </div>
      <div className="mb-3">
        <input type="password" value={password1} onChange={(e)=>{setpassword1(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder='Enter Your password'  v-model="password1" required/><br/>
      </div>
      
      <div className="mb-3">
      <input type="password" value={password2} onChange={(e)=>{setpassword2(e.target.value)}} className="form-control" id="exampleInputPassword2" placeholder='Confirm  Password'  v-model="password2" required/><br/>
      </div>
      
      <button type="submit" className="btn btn-outline-warning">SUBMIT</button>
    </form>
  </div>
   
    </>
  )
}

export default connect(null, { register })(Signup);