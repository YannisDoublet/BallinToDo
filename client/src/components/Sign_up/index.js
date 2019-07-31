import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../../actions/userActions";
import classnames from 'classnames'
import './sign_up.css'

const SignUp = (props) => {

    let dispatch = useDispatch();
    let sign_up = useSelector(state => state.user.sign_up);
    const {handleAlert, changeChoice} = props;
    let [showInstructions, setShowInstructions] = useState(false);
    let [instructions, setInstructions] = useState({
        valid_length: '',
        valid_number: '',
        valid_capital: '',
        valid_special: '',
    });
    let [formData, setFormData] = useState({
        email: '',
        password: '',
        repeat_password: ''
    });


    useEffect(() => {
        if (sign_up && sign_up.status && sign_up.type && sign_up.message) {
            if (sign_up.type === 'success') {
               changeChoice();
            }
            handleAlert(sign_up)
        }
    },[changeChoice, handleAlert, sign_up]);


    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        if (e.target.id === 'password') {
            setInstructions({
                valid_length: e.target.value.length > 8,
                valid_number: !!/[0-9]+/.test(e.target.value),
                valid_capital: !!/[A-Z]+/.test(e.target.value),
                valid_special: !!/[!@#$%^&*(),.?":{}|<>]+/.test(e.target.value),
            })
        }
    };

    const updateShowInstructions = () => {
        setShowInstructions(!showInstructions)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let {email, password, repeat_password} = formData;
        let {valid_length, valid_number, valid_capital, valid_special} = instructions;

        if (email && email.length && password && password.length && repeat_password && repeat_password.length
            && password === repeat_password && valid_length && valid_number && valid_capital && valid_special) {
            dispatch(signUp(formData));
        } else {
            handleAlert({
                status: true,
                type: 'error',
                message: 'Invalid data provided !'
            })
        }
    };

    return (
        <form id={'sign_up_container'} onSubmit={(e) => handleSubmit(e)}>
            <input id='email' className={'sign_up_input'} type={'email'} placeholder={'Email'} onChange={(e) => updateFormData(e)}/>
            <input id='password' className={'sign_up_input'} type={'password'} placeholder={'Password'}
                   onFocus={updateShowInstructions} onBlur={updateShowInstructions} onChange={(e) => updateFormData(e)}/>
            <div id={'password_instructions'} className={classnames('', {display: showInstructions})}>
                <p className={classnames('', {valid: instructions.valid_length})}>
                    <i className={'fas fa-check'} />Contains more than 8 characters</p>
                <p className={classnames('', {valid: instructions.valid_number})}>
                    <i className={'fas fa-check'} />Contains a number</p>
                <p className={classnames('', {valid: instructions.valid_capital})}>
                    <i className={'fas fa-check'} />Contains a capital letter</p>
                <p className={classnames('', {valid: instructions.valid_special})}>
                    <i className={'fas fa-check'} />Contain a special character</p>
            </div>
            <input id='repeat_password' className={'sign_up_input'} type={'password'} placeholder={'Repeat password'}
                   onChange={(e) => updateFormData(e)}/>
            <button id={'sign_up_button'}>Sign-up</button>
        </form>
    )
};

export default SignUp