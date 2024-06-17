import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/authActions';
import Swal from 'sweetalert2';


const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login({ email, password }));
      if (response.payload && response.payload.access) {
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting to home page...',
          timer: 2000, 
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/home');
        });
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your email and password.',
        });
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
     
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again later.',
      });
    }
  }

  return (
    <>
    <div>
     
     <div className="signup-container mt-10">
    <h2 className='text-black'>LOGIN</h2>
    <br/>
    <form onSubmit={handleLogin} >
    
      <div class="mb-3">
        <input type="email" className="form-control" value={email}  onChange={(e)=>{setUsername(e.target.value)}} placeholder= 'Enter Your Email' id="exampleInputEmail1" v-model="email" required/><br/>
      </div>
      <div class="mb-3">
        <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="exampleInputPassword1" placeholder='Enter Your password'  v-model="password" required/>
      </div>
      {loading && <Spinner animation="border" />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="btn btn-outline-warning">LOGIN</button>
      <button type="submit" className="btn btn-outline-warning m-4" onClick={()=>navigate('/signup')}>Sign Up</button>
    </form>
  </div>
  
    </div>
    <style jsx>{`
        .signup-container {
          background-color: rgba(255, 255, 255, 0.5); 
          padding: 60px 35px;
          border-radius: 10px;
          
        }
        .form-control {
          background-color: transparent;
          // background-color: rgba(255, 255, 255, 0.8);
          border: 3px solid #ccc; /* Add border for better visibility */
          padding: 10px;
          color: black !important; /* Ensure text color is black */          outline: none; /* Remove default focus outline */
        }
     .form-control::placeholder {
         color: rgba(0, 0, 0, 0.5); /* Placeholder text color */
        }
      .form-control:focus {
          background-color: transparent; /* Keep input background transparent when focused */
          color: black !important; /* Ensure text color is black */          outline: none; /* Remove default focus outline */
          outline: none; /* Remove default focus outline */
          border-color: #fff; /* Change border color on focus */
        }
        
      `}</style>
    </>
    
  )
}

export default Login