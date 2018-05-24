import {combineReducers} from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import runsReducer from './runsReducer';

export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    runs: runsReducer
});