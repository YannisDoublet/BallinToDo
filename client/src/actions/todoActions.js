import axios from 'axios';
import {ADD_TODO, GET_TODO, CHANGE_PRIORITY, CHANGE_STATUS, ERASE_TODO} from './types';

export const addTodo = (value) => dispatch => {
    axios.post('/api/addTodo', {value})
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: res.data
            });
        });
};

export const changePriority = (content) => dispatch => {
    axios.post('/api/changePriority', {content})
        .then(res => {
           dispatch({
               type: CHANGE_PRIORITY,
               payload: res.data
           })
        });
};

export const changeStatus = (content) => dispatch => {
    axios.post('/api/changeStatus', {content})
        .then(res => {
            dispatch({
                type: CHANGE_STATUS,
                payload: res.data
            })
        });
};

export const eraseTodo = (content) => dispatch => {
    axios.post('/api/eraseTodo', {content})
        .then(res => {
            dispatch({
                type: ERASE_TODO,
                payload: res.data
            })
        });
};

export const refreshTodo = () => dispatch => {
    axios.get(`/api/getTodo`)
        .then(res => {
            return dispatch({
                type: GET_TODO,
                payload: res.data
            })
        });
};