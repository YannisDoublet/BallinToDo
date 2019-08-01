import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../actions/userActions";
import './sign_in.css'

const SignIn = (props) => {

    let dispatch = useDispatch();
    let {handleAlert} = props;
    let sign_in = useSelector(state => state.user.sign_in);
    let [redirect, setRedirect] = useState(false);
    let [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (sign_in) {
            if (sign_in.type && sign_in.type === 'error' && sign_in.status && sign_in.message && sign_in.message.length) {
                handleAlert(sign_in);
            } else if (sign_in.type === 'success' && sign_in.token && sign_in.token.length) {
                localStorage.setItem('T', sign_in.token);
                setRedirect(true);
            }
        }
    },[handleAlert, sign_in]);

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let {email, password} = formData;

        if (email && email.length && password && password.length) {
            dispatch(signIn(formData));
        } else {
            handleAlert({
                status: true,
                type: 'error',
                message: 'Invalid information provided'
            })
        }
    };

    return (
        <form id={'sign_in_container'} onSubmit={(e) => handleSubmit(e)}>
            {redirect && <Redirect to={'/todo'}/>}
            <input id={'email'} className={'sign_in_input'} type={'text'} placeholder={'Email'}
                   onChange={(e) => updateFormData(e)}/>
            <input id={'password'} className={'sign_in_input'} type={'password'} placeholder={'Password'}
                   onChange={(e) => updateFormData(e)}/>
            <button id={'sign_in_button'}>Sign-in</button>
        </form>
    )
};

export default SignIn