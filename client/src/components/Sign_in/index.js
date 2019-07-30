import React from 'react'
import './sign_in.css'

const SignIn = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form id={'sign_in_container'} onSubmit={(e) => handleSubmit(e)}>
            <input className={'sign_in_input'} type={'text'} placeholder={'Email'}/>
            <input className={'sign_in_input'} type={'password'} placeholder={'Password'}/>
            <button id={'sign_in_button'}>Sign-in</button>
        </form>
    )
};

export default SignIn