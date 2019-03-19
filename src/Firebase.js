import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

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
