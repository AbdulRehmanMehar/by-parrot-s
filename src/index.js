import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import App from './App'; 
import firebaseConfig from './Firebase';
import rootReducer from './store/reducers/rootReducer';

const store = createStore(rootReducer, compose(
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, { attachAuthIsReady: true }),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
));
store.firebaseAuthIsReady
    .then(_ => ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
