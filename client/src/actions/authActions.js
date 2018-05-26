import { NativeModules } from 'react-native';
import {AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGOUT, AUTH_LOGOUT_ERROR} from "./types";
import axios from 'axios';

const { RNTwitterSignIn } = NativeModules;
const Constants = {
    TWITTER_COMSUMER_KEY: 'QZVbxlEKetOIdlXa28eNIxw0W',
    TWITTER_CONSUMER_SECRET: 'nKO7bGTK6IamSeA8swBwcbJk6V4UwREVQBYfQFO52N3kt3RDEa'
};

export const authLoginUser = () => {
    return async dispatch => {
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
        await RNTwitterSignIn.logIn()
            .then(async loginData => {
                const { authToken, authTokenSecret, userID, userName, name } = loginData;

                if (authToken && authTokenSecret) {
                    try {
                        const res = await axios.post('https://buddyrunner.herokuapp.com/auth', {
                            id: userID,
                            user_name: userName,
                            name: name,
                            token: authToken,
                            secret: authTokenSecret
                        });

                        dispatch({
                            type: AUTH_LOGIN,
                            payload: res.data
                        });
                    } catch (error) {
                        dispatch({
                            type: AUTH_LOGIN_ERROR,
                            payload: error
                        });
                    }
                }
            })
            .catch(error => {
                    console.log(error)
                }
            )
    }
};

export const authLogoutUser = () => dispatch =>{
    RNTwitterSignIn.logOut()
        .then((res) => dispatch({
            type: AUTH_LOGOUT,
            payload: res.data
        }))
        .catch((error) => dispatch({
            type: AUTH_LOGOUT_ERROR,
            payload: error
        }));
};