import React, {useState, useEffect, Fragment} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from 'react-router-dom'
import {getList} from "../../actions/todoActions";
import {ACTIVE_LIST, LOGOUT} from "../../actions/types";
import './navbar_utils.css'

const NavbarUtils = (props) => {

    let dispatch = useDispatch();
    let lists = useSelector(state => state.todo.todoList);
    let token = localStorage.getItem('T');
    let [redirect, setRedirect] = useState(false);
    let [activeList, setActiveList] = useState(0);

    useEffect(() => {
        dispatch(getList(token));
    }, [dispatch, token]);

    useEffect(() => {
        dispatch({type: ACTIVE_LIST, payload: activeList});
    }, [dispatch, activeList]);

    const logoutUser = async () => {
        await localStorage.removeItem('T');
        dispatch({type: LOGOUT});
        setRedirect(true);
    };

    const displayList = (lists) => {
        return lists.map(list => {
            return (
                <p>{list.title}</p>
            )
        });
    };

    return (
        <Fragment>
            {redirect && <Redirect to={'/'}/>}
            <div id={'addTodo_wrapper'}>
                <button id={'add_todo_button'}>Add todo</button>
            </div>
            <div id={'utils_wrapper'}>
                <div id={'todo-list'} />
                <div id={'listDropdown'}>
                    {lists && lists.length && displayList(lists)}
                </div>
                <div id={'logout'} onClick={logoutUser}/>
            </div>
        </Fragment>
    )
};

export default NavbarUtils