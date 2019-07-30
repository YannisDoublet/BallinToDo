import {combineReducers} from 'redux'
import todo from './todoReducers'

const rootReducer = combineReducers({
    todo
});

export default rootReducer