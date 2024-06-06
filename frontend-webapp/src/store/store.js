import {  applyMiddleware, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const store = legacy_createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;