import {ADD_LIST, ADD_TODO, GET_LIST, ACTIVE_LIST, GET_TODO, CHANGE_LIST_TITLE,
    CHANGE_PRIORITY, CHANGE_STATUS, ERASE_TODO, DELETE_LIST, LOGOUT} from "../actions/types";

export default function(state={}, action) {
    switch(action.type) {
        case ADD_LIST:
            return {...state, addList: action.payload};
        case ADD_TODO:
            return {...state, response: action.payload};
        case GET_LIST:
            return {...state, todoList: action.payload};
        case ACTIVE_LIST:
            return {...state, active: action.payload};
        case GET_TODO:
            return {...state, todo: action.payload};
        case CHANGE_LIST_TITLE:
            return {...state, title: action.payload};
        case CHANGE_PRIORITY:
            return {...state, priority: action.payload};
        case CHANGE_STATUS:
            return {...state, status: action.payload};
        case ERASE_TODO:
            return {...state, erase: action.payload};
        case DELETE_LIST:
            return {...state, deleteList: action.payload};
        case LOGOUT:
            return {state: {}};
        default:
            return state;
    }
}