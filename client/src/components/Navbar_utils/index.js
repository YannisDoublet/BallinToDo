import React, {useState, useEffect, Fragment} from 'react'
import './navbar_utils.css'

const NavbarUtils = (props) => {
    return (
        <Fragment>
            <div id={'addTodo_wrapper'}>
                <button id={'add_todo_button'}>Add todo</button>
            </div>
            <div id={'utils_wrapper'}>
                <div id={'todo-list'} />
                <div id={'logout'} />
            </div>
        </Fragment>
    )
};

export default NavbarUtils