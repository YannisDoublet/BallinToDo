import {SIGN_UP, SIGN_IN} from "./types";
import axios from 'axios'

export const signUp = (formData) => dispatch => {
    axios.post('/api/user/sign_up', {email: formData.email, password: formData.password})
        .then(res => {
            dispatch({
                type: SIGN_UP,
                payload: res.data
            })
        });
};

export const signIn = (formData) => dispatch => {
    axios.post('/api/user/sign_in', {email: formData.email, password: formData.password})
        .then(res => {
            dispatch({
                type: SIGN_IN,
                payload: res.data
            })
        })
};