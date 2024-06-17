import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import {useDispatch} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './userprofile.css'




const Profile = () => {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  // const [profimage, setprofImage] = useState({});
  const [changeimage,setChangeimage] = useState(false)
  
   
  const token = localStorage.getItem("access_token")
 
 
  const navigate = useNavigate()
 
 
  const handlesubmit = async (e)=> {
    e.preventDefault();
    if (!image) {
      console.log('Please select an image to upload.');
      return;
  }
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await axios.post(`http://127.0.0.1:8000/profileimg/${profile.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.data) {
      alert("image uploaded sucussfully")
      setChangeimage(!changeimage)

    } else {
        console.log('Faiiii');
    }
} catch (error) {
   alert("Error uploading image")
    console.error('Error uploading image:', error);
    console.log('Error uploading image');
}


  }

  useEffect (()=>{
    const fectchprofileimg = async ()=>{
      if(!token){
        console.log("error found");
        setError("profile not found")
        return
      }
      try{
        const response = await axios.get('http://127.0.0.1:8000/profileview/',{
          headers:{
            'Content-Type': 'application/json',
             
            'Authorization': `Bearer ${token}` 
          }
        })
        setImage(response.data.profile_image);
      }catch(error){
        if (error.response) {
          
          console.error('Error fetching profile:', error.response.data);
          navigate('/profile')
          
      } else {
          
        console.error('Error fetching profile:', error.message);
        navigate('/profile')
        
      }
      }
    }
    fectchprofileimg()
  },[changeimage])
  

  useEffect (()=>{
    const fectchprofile = async ()=>{
      if(!token){
        console.log("error found");
        setError("profile not found")
        return
      }
      try{
        const response = await axios.get('http://127.0.0.1:8000/profile/',{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        })
        
        setProfile(response.data);
      }catch(error){
        if (error.response) {
          
          console.error('Error fetching profile:', error.response.data);
          setError(error.response.data.error);
      } else {
          
        console.error('Error fetching profile:', error.message);
        setError('Error fetching profile');
      }
      }
    }
    fectchprofile()
  },[])
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
      return <div>Loading...</div>;
  }
 
  
  return (
    
    <Container className="mt-5" >
      <Row className="justify-content-md-center" width="100">
        <Col md="6">
          <Card className='profileclass'>
            <Card.Header className='bg-dark text-white'>Profile</Card.Header>
            <Card.Body className='bg-light'>
              <Form onSubmit={handlesubmit}>
                <Form.Group  controlId="formFile" className="mb-3">
                  <Form.Label className='text-dark '>Upload Profile Picture</Form.Label>
                  <Form.Control type="file"  onChange={(e)=>{setImage(e.target.files[0])}} accept='png'  />
                </Form.Group>
                {image && (
                  <div className="text-center mb-3">
                    {
                      image ? (
                    <img src={`http://127.0.0.1:8000${image}`}  alt="Profile" className="img-fluid rounded-circle" width="120" />

                      ) : (
                        <div><p>no image</p></div>
                      )
                    }
                    
                  </div>
                )}
                <h5 className='text-dark'>Name:   {profile.username}</h5>
                <h5 className='text-dark'>Email:  {profile.email}</h5>
                <br/>
                <Button variant="dark" type="submit" className='mx-3'>
                  Save Profile
                </Button>
                <Button onClick={()=>{navigate('/home')}} variant="dark" type="submit">
                 Home
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  
  );
};

export default Profile;
