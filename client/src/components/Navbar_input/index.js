import React, {useState, useEffect} from 'react'
import './navbar_input.css'

const NavbarInput = (props) => {
    let [input, setInput] = useState('My awesome todo');

    const submitTitle = (e) => {
        e.preventDefault();
    };

    return (
        <form id={'navbar_form_container'} onSubmit={(e) => submitTitle(e)}>
            <input id={'navbar_input'} type={'text'} value={input} onChange={(e) => setInput(e.target.value)}/>
        </form>
    )
};

export default NavbarInput