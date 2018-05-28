import {
    CREATE_RUN, CREATE_RUN_ERROR, FETCH_CREATED_RUNS, FETCH_CREATED_RUNS_ERROR, FETCH_FRIENDS_RUNS,
    FETCH_FRIENDS_RUNS_ERROR, FETCH_MY_RUNS,
    FETCH_MY_RUNS_ERROR, FETCH_SINGLE_RUN, FETCH_SINGLE_RUN_ERROR,
	FETCH_PATH, FETCH_PATH_ERROR,
    CREATE_TIME, CREATE_TIME_ERROR
} from '../actions/types'

const initialState = {
    myCreatedRuns: [],
    myRuns: [],
    friendsRuns: [],
    singleRun: [],
    loading: true,
    error: null,
	path: []
};

export default function(state=initialState, action){
    state.loading = true;

    switch(action.type){
        case FETCH_CREATED_RUNS:
            return {
                ...state,
                loading: false,
                myCreatedRuns: action.payload,
                error: null
            };
        case FETCH_CREATED_RUNS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_MY_RUNS:
            return {
                ...state,
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
        case CREATE_RUN:
            return {
                ...state,
                error: null
            };
        case CREATE_RUN_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case FETCH_SINGLE_RUN:
            return {
                ...state,
                loading: false,
                singleRun: action.payload,
                error: null
            };
        case FETCH_SINGLE_RUN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
		case FETCH_PATH:
            return {
                ...state,
                loading: false,
                path: action.payload,
                error: null
            };
        case FETCH_PATH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_TIME:
            return {
                ...state,
                error: null
            };
        case CREATE_TIME_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}