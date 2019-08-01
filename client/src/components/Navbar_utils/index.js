import React, {useState, useEffect, Fragment} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from 'react-router-dom'
import {addList, getList, deleteList} from "../../actions/todoActions";
import {ACTIVE_LIST, LOGOUT} from "../../actions/types";
import './navbar_utils.css'

const NavbarUtils = (props) => {

    let dispatch = useDispatch();
    let lists = useSelector(state => state.todo.todoList);
    let addListsResponse = useSelector(state => state.todo.addList);
    let deleteListResponse = useSelector(state => state.todo.deleteList);
    let token = localStorage.getItem('T');
    let [redirect, setRedirect] = useState(false);
    let [activeList, setActiveList] = useState(0);


    useEffect(() => {
        if (token && token.length) {
            dispatch(getList(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        dispatch({type: ACTIVE_LIST, payload: activeList});
    }, [dispatch, activeList]);

    useEffect(() => {
        if (addListsResponse && typeof addListsResponse.listLength === 'number') {
            dispatch(getList(token)).then(() => {
                setTimeout(() => {
                    setActiveList(addListsResponse.listLength);
                }, 150)
            })
        }
    }, [dispatch, token, addListsResponse]);

    useEffect(() => {
        if (deleteListResponse && typeof deleteListResponse.active === 'number') {
            dispatch(getList(token)).then(() => {
                setActiveList(deleteListResponse.active);
            })
        }
    }, [dispatch, token, deleteListResponse]);

    const changeList = (e) => {
        setActiveList(e.target.id);
        document.querySelector('#listDropdown').classList.add('none');
    };

    const addTodoList = () => {
        if (token) {
            dispatch(addList(token));
        }
    };

    const deleteTodoList = () => {
        if (token && lists && activeList !== undefined) {
            dispatch(deleteList(token, lists[activeList].listId));
        }
    };

    const logoutUser = async () => {
        await localStorage.removeItem('T');
        dispatch({type: LOGOUT});
        setRedirect(true);
    };

    const displayList = (lists) => {
        if (lists) {
            return lists.map((list, i) => {
                return (
                    <p key={i} id={i} onClick={(e) => changeList(e)}>{list.title}</p>
                )
            });
        }
    };

    const showDropdown = () => {
        let dropdown = document.querySelector('#listDropdown');
        dropdown.classList.contains('none') ? dropdown.classList.remove('none') : dropdown.classList.add('none');
    };

    return (
        <Fragment>
            {redirect && <Redirect to={'/'}/>}
            <div id={'buttonUtils_wrapper'}>
                <button onClick={addTodoList}>Add</button>
                <button onClick={deleteTodoList}>Erase</button>
            </div>
            <div id={'utils_wrapper'}>
                <div id={'todo-list'} onClick={showDropdown}/>
                <div id={'listDropdown'} className={'none'}>
                    {lists && lists.length && displayList(lists)}
                </div>
                <div id={'logout'} onClick={logoutUser}/>
            </div>
        </Fragment>
    )
};

export default NavbarUtils