import {combineReducers} from 'redux'
import todo from './todoReducers'
import user from './userReducers'

const rootReducer = combineReducers({
    todo,
    user
});

export default rootReducer