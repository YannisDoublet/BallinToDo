import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

import Routes from './routes'
import Reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(Reducers)}>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
</Provider>, document.getElementById('root'));
