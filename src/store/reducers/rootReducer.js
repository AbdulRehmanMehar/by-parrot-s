import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import validationReducer from './validationReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    item: itemReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    validator: validationReducer,
});

export default rootReducer;