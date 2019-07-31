import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import classnames from 'classnames'
import SignIn from '../../components/Sign_in'
import SignUp from '../../components/Sign_up'
import Alert from '../../components/Alert'
import './connection.css'

class Connection extends Component {

    state = {
        sign_in: true,
        sign_up: false,
        alert: {
            status: false,
            type: '',
            message: ''
        },
        redirect: false
    };

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.validateAlert) {
            let newState = this.state;
            let alert = this.props.location.state.validateAlert;
            newState.alert.status = alert.status;
            newState.alert.type = alert.type;
            newState.alert.message = alert.message;
            newState.sign_in = true;
            newState.sign_up = false;
            this.setState({
                ...newState
            })
        } else if (localStorage.getItem('T')) {
            this.setState({
                redirect: true
            })
        }
    }

    changeChoice = () => {
        this.setState({
            sign_in: !this.state.sign_in,
            sign_up: !this.state.sign_up
        })
    };

    handleAlert = (alert) => {
        this.setState({
            alert: alert
        })
    };

    render() {
        let {sign_in, sign_up, redirect, alert} = this.state;
        return (
            <div id={'connection_wrapper'}>
                {redirect && <Redirect to={'/todo'}/>}
                <Alert alert={alert} handleAlert={this.handleAlert}/>
                <div id={'connection_container'}>
                    <div id={'connection_choice'}>
                        <p className={classnames('connection_title', {'active': sign_in === true})} onClick={this.changeChoice}>Sign-in</p>
                        <p className={classnames('connection_title', {'active': sign_up === true})} onClick={this.changeChoice}>Sign-up</p>
                    </div>
                    {sign_in === true && sign_up === false && <SignIn handleAlert={this.handleAlert}/>}
                    {sign_up === true && sign_in === false && <SignUp handleAlert={this.handleAlert} changeChoice={this.changeChoice}/>}
                </div>
            </div>
        )
    }
}

export default Connection