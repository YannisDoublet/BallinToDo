import axios from 'axios';
import {ADD_TODO, GET_LIST, GET_TODO, CHANGE_LIST_TITLE, CHANGE_PRIORITY, CHANGE_STATUS, ERASE_TODO} from './types';

export const addTodo = (value, listId) => dispatch => {
    axios.post('/api/addTodo', {value, listId})
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: res.data
            });
        });
};

export const getList = (token) => dispatch => {
    axios.get(`/api/getList?token=${token}`)
        .then(res => {
            return dispatch({
                type: GET_LIST,
                payload: res.data
            })
        });
};

export const getTodo = (listId) => dispatch => {
    axios.get(`/api/getTodo?listId=${listId}`)
        .then(res => {
            return dispatch({
                type: GET_TODO,
                payload: res.data
            })
        })
};

export const changeListTitle = (title, listId) => dispatch => {
    axios.post('/api/changeListTitle', {title, listId})
        .then(res => {
            return dispatch({
                type: CHANGE_LIST_TITLE,
                payload: res.data
            })
        })
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

