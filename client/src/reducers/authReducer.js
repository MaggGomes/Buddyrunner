import {AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGOUT, AUTH_LOGOUT_ERROR} from '../actions/types'

const initialState = {
    data: [],
    isLoggedIn: false,
    loading: false,
    error: null
};

export default function(state=initialState, action){
    state.loading = true;

    switch(action.type){
        case AUTH_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                data: action.payload,
                error: null
            };
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                error: null
            };
        case AUTH_LOGOUT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}