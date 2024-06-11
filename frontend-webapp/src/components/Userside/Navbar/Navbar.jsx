import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/authActions';
import {  useNavigate } from 'react-router-dom';

const Navbar = () => {
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async (e) =>{
    e.preventDefault();
    const response = dispatch(logout())
    if (response){
      navigate('/')

    }

  }

  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
        </li>
        
        
        
      </ul>
      
  <div class="container-fluid">
         <div className="d-flex justify-content-end">
            <button onClick={handlelogout}  className='btn btn-danger mx-3'>Logout</button>
            <button onClick={()=>navigate('/profile')} class="btn btn-outline-success" type="submit">Profile</button>
        </div>
   
      
    
  </div>

    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar