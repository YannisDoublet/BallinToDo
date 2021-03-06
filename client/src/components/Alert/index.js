import React, {Component} from 'react'
import classnames from 'classnames'

import './alert.css'

class Alert extends Component {

    state = {
        step: 1
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps !== this.props && nextProps.alert && nextProps.alert.message !== '') {
            this.setState({
                step: 2
            });
        }
    }

    closeAlert = () => {
        this.setState({
            step: 1
        });
        let alert = this.props.alert;
        alert.status = false;
        alert.message = '';
        this.props.handleAlert(alert);
    };

    render() {
        let alert = this.props.alert;
        let type = this.props.alert.type === 'error' ? 'error' : 'success';
        return (
            <div id={'alert_container'} className={classnames(`${type}`, {'active_alert': this.state.step === 2})}>
                <div id={'alert_message'}>{alert.message}</div>
                <div id={'alert_close_button'} onClick={this.closeAlert}><i className="fas fa-times"/></div>
            </div>
        )
    };
};

export default Alert;