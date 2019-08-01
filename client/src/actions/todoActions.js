import axios from 'axios';
import {ADD_LIST, ADD_TODO, GET_LIST, GET_TODO, CHANGE_LIST_TITLE,
    CHANGE_PRIORITY, CHANGE_STATUS, ERASE_TODO, DELETE_LIST} from './types';

export const addList = (token) => dispatch => {
    axios.post('/api/addList', {token})
        .then(res => {
            return dispatch({
                type: ADD_LIST,
                payload: res.data
            })
        })
};

export const addTodo = (value, listId, type) => dispatch => {
    axios.post('/api/addTodo', {value, listId, type})
        .then(res => {
            return dispatch({
                type: ADD_TODO,
                payload: res.data
            });
        });
};

export const getList = (token) => dispatch => {
    axios.post('/api/getList', {token})
        .then(res => {
            dispatch({
                type: GET_LIST,
                payload: res.data
            })
        });
    return Promise.resolve();
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

export const changePriority = (content, listId) => dispatch => {
    axios.post('/api/changePriority', {content, listId})
        .then(res => {
           return dispatch({
               type: CHANGE_PRIORITY,
               payload: res.data
           })
        });
};

export const changeStatus = (content, listId, type) => dispatch => {
    axios.post('/api/changeStatus', {content, listId, type})
        .then(res => {
            return dispatch({
                type: CHANGE_STATUS,
                payload: res.data
            })
        });
};

export const eraseTodo = (content, listId, type) => dispatch => {
    axios.post('/api/eraseTodo', {content, listId, type})
        .then(res => {
            return dispatch({
                type: ERASE_TODO,
                payload: res.data
            })
        });
};

export const deleteList = (token, listId) => dispatch => {
    axios.post('/api/deleteList', {token, listId})
        .then(res => {
            return dispatch({
                type: DELETE_LIST,
                payload: res.data
            })
        })
};
