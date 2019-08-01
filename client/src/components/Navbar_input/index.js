import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeListTitle, getList} from "../../actions/todoActions";
import './navbar_input.css'

const NavbarInput = (props) => {

    let dispatch = useDispatch();
    let list = useSelector(state => state.todo.todoList);
    let active = useSelector(state => state.todo.active);
    let title = useSelector(state => state.todo.title);
    let [input, setInput] = useState('');

    useEffect(() => {
        if (list && list.length && active !== undefined) {
            setInput(list[active].title);
        }
    }, [list, active]);

    useEffect(() => {
        dispatch(getList(localStorage.getItem('T')));
    }, [dispatch, title]);

    const submitTitle = (e) => {
        e.preventDefault();
        dispatch(changeListTitle(input, list[active].listId));
        document.querySelector('#navbar_input').blur();
    };

    return (
        <form id={'navbar_form_container'} onSubmit={(e) => submitTitle(e)}>
            <input id={'navbar_input'} type={'text'} value={input} onChange={(e) => setInput(e.target.value)}/>
        </form>
    )
};

export default NavbarInput