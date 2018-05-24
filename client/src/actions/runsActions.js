import {FETCH_MY_RUNS_ERROR, FETCH_MY_RUNS, FETCH_FRIENDS_RUNS, FETCH_FRIENDS_RUNS_ERROR} from './types';
import axios from 'axios';

export const fetchMyRuns = () => dispatch =>{
    axios.get('https://buddyrunner.herokuapp.com/runs')
        .then((res) => dispatch({
            type: FETCH_MY_RUNS,
            payload: res.data
        }))
        .catch((error) => dispatch({
            type: FETCH_MY_RUNS_ERROR,
            payload: error
        }));
};

export const fetchFriendsRuns = () => dispatch =>{
    axios.get('https://buddyrunner.herokuapp.com/runs/friends')
        .then((res) => dispatch({
            type: FETCH_FRIENDS_RUNS,
            payload: res.data
        }))
        .catch((error) => dispatch({
            type: FETCH_FRIENDS_RUNS_ERROR,
            payload: error
        }));
};