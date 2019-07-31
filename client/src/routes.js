import React from 'react';
import {Switch, Route} from 'react-router-dom'
import ValidateEmail from './components/ValidateEmail'
import Connection from './containers/connection_container'
import Home from './containers/home_container'

const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} exact component={Connection}/>
            <Route path={'/todo'} exact component={Home}/>
            <Route path={'/validate:token'} exact component={ValidateEmail} />
        </Switch>
    );
};

export default Routes