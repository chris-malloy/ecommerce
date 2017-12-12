import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// for ajax 
import reduxPromise from 'redux-promise';
// redux store, middleware
import { createStore, applyMiddleware } from 'redux';
// all reducers
import RootReducer from './reducers/RootReducer';
// provider combines redux and react
import { Provider } from 'react-redux';

const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer);

ReactDOM.render(
    <Provider store={theStore}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
