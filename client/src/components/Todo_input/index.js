import React, {useState, useEffect} from 'react'
import {addTodo} from '../../actions/todoActions'
import {useDispatch, useSelector} from "react-redux";

const TodoInput = (props) => {
    const {update, listId, type} = props;
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const response = useSelector(state => state.todo.response);

    useEffect(() => {
        if (response) {
            update();
            setInput('');
        }
    }, [update, response]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input && input.length) {
            dispatch(addTodo(input, listId, type));
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} id={'todo_form'}>
            <input id={'todo_input'} type={'text'} onChange={(e) => setInput(e.target.value)} value={input}
                   placeholder={'Add a to-do...'}/>
        </form>
    )
};
export default TodoInput;