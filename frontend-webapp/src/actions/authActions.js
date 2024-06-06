import axios from 'axios'
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