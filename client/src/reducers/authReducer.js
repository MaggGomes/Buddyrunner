import {FETCH_EVENTS, FETCH_EVENTS_ERROR} from '../actions/types'

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function(state=initialState, action){
    state.loading = true;

    switch(action.type){
        case FETCH_EVENTS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case FETCH_EVENTS_ERROR:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        default:
            return state;
    }
}