import React from 'react'
import './sign_up.css'

const SignUp = (props) => {
    return (
        <form id={'sign_up_container'}>
            <input className={'sign_up_input'} type={'text'} placeholder={'Email'}/>
            <input className={'sign_up_input'} type={'password'} placeholder={'Password'}/>
            <input className={'sign_up_input'} type={'password'} placeholder={'Repeat password'}/>
            <button id={'sign_up_button'}>Sign-up</button>
        </form>
    )
};

export default SignUp