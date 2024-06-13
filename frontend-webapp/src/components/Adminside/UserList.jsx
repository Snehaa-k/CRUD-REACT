import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutadmin } from '../../actions/authActions';
import apiService from '../../apiservice/Apiservice';
import { useEffect } from 'react';
import Swal from 'sweetalert2';





const UserList = () => {
const [users, setUsers] = useState([])
const [currentUser, setCurrentUser] = useState({ id: null, username: '', email: '',password:'' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
      navigate('/adlogin'); 
      return;
    }
    apiService.getUsers().then((response) => 
    
      
      
      setUsers(response.data));
      
    
    
      
  }, []);

  // const addUser = () => {
  //   userService.createUser({ username, email }).then(() => {
      
  //   });
  // };

  const [showModal, setShowModal] = useState(false);
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async (e) =>{
    e.preventDefault();
    const response = dispatch(logoutadmin())
    if (response){
      navigate('/adlogin')

    }

  }




  const handleShowModal = (user = { id: null, username: '', email: '' }) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


const handleSaveUser = () => {
    if (currentUser.id) {
      apiService.updateUser(currentUser.id, currentUser).then(() => {
        Swal.fire({
          icon: 'success',
          title: ' Successfully updated',
          text: 'Redirecting to home page...',
          timer: 2000, 
          timerProgressBar: true,
          showConfirmButton: false
        })
      
        handleCloseModal();
      });
    } else {
      apiService.createUser(currentUser).then(() => {
        Swal.fire({
          icon: 'success',
          title: ' Successfully added',
          text: 'Redirecting to home page...',
          timer: 2000, 
          timerProgressBar: true,
          showConfirmButton: false
        })
      
        handleCloseModal();
      });
    }
  };

  
  
  const handleDeleteUser = (id) => {
    apiService.deleteUser(id).then((response) => {
    
      
    setUsers(currentusr=>currentusr.filter(user => user.id !== id)); 
    if (response) {
      alert('User deleted successfully!');
    } else {
      alert('Failed to delete user.');
    }
  }).catch((error) => {
   
    console.error('Error deleting user:', error);
    alert('An error occurred while deleting the user.');
  });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="10">
          <Card>
            <Card.Header>
              User List
              <Button variant="primary" className="float-end" onClick={() => handleShowModal()}>Add User</Button>
              <Button variant="primary" className="float-end mx-4" onClick={handlelogout}>LOGOUT</Button>

            </Card.Header>
            <Card.Body>
           
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                 
                  {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            <Button variant="warning" className="me-2" onClick={() => handleShowModal(user)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                          </td>
                        </tr>
                      )
                    
                  
)}
                </tbody>

              </Table>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser.id ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={currentUser.username}
                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
            </Form.Group>
            {!currentUser.id &&
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={currentUser.password}
                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
              />
            </Form.Group>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveUser}>{currentUser.id ? 'Update User' : 'Save User'}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
