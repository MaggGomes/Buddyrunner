import {combineReducers} from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import runsReducer from './runsReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    runs: runsReducer,
    form: formReducer
});