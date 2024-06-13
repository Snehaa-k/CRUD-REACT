
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Update with your Django backend URL

const apiService = {
  getUsers: () => axios.get(`${API_URL}/userview/`),
  getUser: (id) => axios.get(`${API_URL}/userview/${id}/`),
  createUser: (userData) => axios.post(`${API_URL}/userview/`, userData),
  updateUser: (id, userData) => axios.put(`${API_URL}/userview/${id}/`, userData),
  deleteUser: (id) => axios.delete(`${API_URL}/userview/${id}/`),
};

export default apiService;
