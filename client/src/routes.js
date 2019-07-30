import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Connection from './containers/connection_container'
import Home from './containers/home_container'

const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} exact component={Connection}/>
            <Route path={'/todo'} exact component={Home}/>
        </Switch>
    );
};

export default Routes