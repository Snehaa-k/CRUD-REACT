import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import {useDispatch} from 'react'
import axios from 'axios'




const Profile = () => {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token")
  
 
  const handlesubmit = async (e)=> {
    console.log(image.name);
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
        console.log('hiiii',response.data);
    } else {
        console.log('Faiiii');
    }
} catch (error) {
    console.error('Error uploading image:', error);
    console.log('Error uploading image');
}


  }

  useEffect (()=>{
    const fectchprofileimg = async ()=>{
      if(!token){
        console.log("error found");
        setError("token not found")
        return
      }
      try{
        const response = await axios.get('http://127.0.0.1:8000/profileview/',{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        })
        
        setImage(response.data);
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
    fectchprofileimg()
  },[])
  

  useEffect (()=>{
    const fectchprofile = async ()=>{
      if(!token){
        console.log("error found");
        setError("token not found")
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
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card>
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              <Form onSubmit={handlesubmit}>
                <Form.Group  controlId="formFile" className="mb-3">
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <Form.Control type="file"  onChange={(e)=>{setImage(e.target.files[0])}} />
                </Form.Group>
                {image && (
                  <div className="text-center mb-3">
                    <img src={image.profile_image} alt="Profile" className="img-fluid rounded-circle" width="150" />
                  </div>
                )}
                <h4>Name:  {profile.username}</h4>
                <h4>Email: {profile.email}</h4>
                
                <Button variant="primary" type="submit">
                  Save Profile
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
