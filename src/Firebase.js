import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAevAlUAUA4pINPrERD6tEJ7w31_vlPI-Y",
    authDomain: "ecom-f021c.firebaseapp.com",
    databaseURL: "https://ecom-f021c.firebaseio.com",
    projectId: "ecom-f021c",
    storageBucket: "ecom-f021c.appspot.com",
    messagingSenderId: "888924054723"
};

firebase.initializeApp(config);

export default firebase;
