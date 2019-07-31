import {SIGN_UP, SIGN_IN, LOGOUT} from "../actions/types";

export default function(state={}, action) {
    switch(action.type) {
        case SIGN_UP:
            return {...state, sign_up: action.payload};
        case SIGN_IN:
            return {...state, sign_in: action.payload};
        case LOGOUT:
            return {...state, sign_in: null};
        default:
            return state;
    }
}