import {
    FETCH_MY_RUNS_ERROR, FETCH_MY_RUNS, FETCH_FRIENDS_RUNS, FETCH_FRIENDS_RUNS_ERROR, CREATE_RUN,
    CREATE_RUN_ERROR, FETCH_SINGLE_RUN, FETCH_SINGLE_RUN_ERROR, FETCH_CREATED_RUNS, FETCH_CREATED_RUNS_ERROR,
	FETCH_PATH, FETCH_PATH_ERROR,
    CREATE_TIME, CREATE_TIME_ERROR
} from './types';
import axios from 'axios';

export const fetchCreatedRuns = () => dispatch =>{
    axios.get('https://buddyrunner.herokuapp.com/runs')
        .then((res) => dispatch({
            type: FETCH_CREATED_RUNS,
            payload: res.data
        }))
        .catch((error) => dispatch({
            type: FETCH_CREATED_RUNS_ERROR,
            payload: error
        }));
};

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

export const createRun = (date, distance, path, duration) => async dispatch =>{
    try {
        const res = await axios.post('https://buddyrunner.herokuapp.com/runs/create', {
            date: date,
            distance: distance,
            path: path,
            duration: duration
        });

        dispatch({
            type: CREATE_RUN,
            payload: res.data
        })
    }catch (error){
        dispatch({
            type: CREATE_RUN_ERROR,
            payload: error
        })
    }
};

export const fetchSingleRun = (id) => dispatch =>{
    axios.get('https://buddyrunner.herokuapp.com/runs/'+id)
        .then((res) => dispatch({
            type: FETCH_SINGLE_RUN,
            payload: res.data
        }))
        .catch((error) => dispatch({
            type: FETCH_SINGLE_RUN_ERROR,
            payload: error
        }));
};

export const fetchPath = (waypoints) => async dispatch => {
	try {
        points = []
        for (var i = 0; i < waypoints.length; i++) {
            points.push(waypoints[i].latitude+','+waypoints[i].longitude);
        }
        
        const res = await axios.get('https://buddyrunner.herokuapp.com/get_path', {params: {path: JSON.stringify(points)}});

        dispatch({
            type: FETCH_PATH,
            payload: res.data
        })
    }catch (error){
        dispatch({
            type: FETCH_PATH_ERROR,
            payload: error
        })
    }
};

export const createTime = (run, time) => async dispatch =>{
    try {
        const res = await axios.post('https://buddyrunner.herokuapp.com/runs/'+run+'/complete', {
            time: time,
        });

        dispatch({
            type: CREATE_TIME,
            payload: res.data
        })
    }catch (error){
        dispatch({
            type: CREATE_TIME_ERROR,
            payload: error
        })
    }
};





