import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { REGISTER_FAIL, REGISTER_SUCCESS } from '../constants/actiontype'


export const register = ({username,email,password1,password2})=> async (dispatch) => {

    try{
        const res = await axios.post('http://127.0.0.1:8000/signup/',{username,email,password1,password2});
        if(res.data.message ="sucess"){
          alert('you registered succefully')
        
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data,
        });
      }
    }catch (err) {
        dispatch({
          type: REGISTER_FAIL,
          
        });
      }
}



export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        email,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  return { type: 'LOGOUT' };
};

export const logoutadmin = () => {
  localStorage.removeItem('admin_access_token');
  localStorage.removeItem('admin_refresh_token');
  return { type: 'LOGOUT' };
};



// const authSlice = createSlice({
//   name: 'logouts',
//   initialState: {
//     user: null,
//     accessToken: localStorage.getItem('access_token'),
//     refreshToken: localStorage.getItem('refresh_token'),
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       console.log(state.user);
//       state.user = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
      
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.accessToken = action.payload.access;
//         state.refreshToken = action.payload.refresh;
//         state.user = action.payload.user;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ? action.payload.detail : action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;
