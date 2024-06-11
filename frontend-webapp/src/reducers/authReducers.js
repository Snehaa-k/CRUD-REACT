import { REGISTER_SUCCESS,REGISTER_FAIL } from "../constants/actiontype";


const initialState = {
    isAuthenticated : false,
}
export default function authReducers(state = initialState, action) {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
        }
      case REGISTER_FAIL:
        return {
          ...state,
          isAuthenticated: false,
        }
      default:
        return state;
    }
  }




