import {combineReducers} from 'redux';
import authReducer from './authReducer';
import runsReducer from './runsReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth: authReducer,
    runs: runsReducer,
    form: formReducer
});