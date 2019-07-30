import React, {Component} from 'react'
import classnames from 'classnames'
import SignIn from '../../components/Sign_in'
import SignUp from '../../components/Sign_up'
import './connection.css'

class Connection extends Component {

    state = {
        sign_in: true,
        sign_up: false
    };

    changeChoice = () => {
        this.setState({
            sign_in: !this.state.sign_in,
            sign_up: !this.state.sign_up
        })
    };

    render() {
        let {sign_in, sign_up} = this.state;
        return (
            <div id={'connection_wrapper'}>
                <div id={'connection_container'}>
                    <div id={'connection_choice'}>
                        <p className={classnames('connection_title', {'active': sign_in === true})} onClick={(e) => this.changeChoice()}>Sign-in</p>
                        <p className={classnames('connection_title', {'active': sign_up === true})} onClick={(e) => this.changeChoice()}>Sign-up</p>
                    </div>
                    {sign_in === true && sign_up === false && <SignIn />}
                    {sign_up === true && sign_in === false && <SignUp />}
                </div>
            </div>
        )
    }
}

export default Connection