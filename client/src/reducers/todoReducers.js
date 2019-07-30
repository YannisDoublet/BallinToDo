import {ADD_TODO, GET_TODO, CHANGE_PRIORITY, CHANGE_STATUS, ERASE_TODO} from "../actions/types";

export default function(state={}, action) {
    switch(action.type) {
        case ADD_TODO:
            return {...state, response: action.payload};
        case GET_TODO:
            return {...state, todoList: action.payload};
        case CHANGE_PRIORITY:
            return {...state, priority: action.payload};
        case CHANGE_STATUS:
            return {...state, status: action.payload};
        case ERASE_TODO:
            return {...state, erase: action.payload};
        default:
            return state;
    }
}