import {FETCH_FRIENDS_RUNS, FETCH_FRIENDS_RUNS_ERROR, FETCH_MY_RUNS, FETCH_MY_RUNS_ERROR,} from '../actions/types'

const initialState = {
    myRuns: [],
    friendsRuns: [],
    isLoggedIn: false,
    loading: false,
    error: null
};

export default function(state=initialState, action){
    state.loading = true;

    switch(action.type){
        case FETCH_MY_RUNS:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                myRuns: action.payload,
                error: null
            };
        case FETCH_MY_RUNS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_FRIENDS_RUNS:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                friendsRuns: action.payload,
                error: null
            };
        case FETCH_FRIENDS_RUNS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}