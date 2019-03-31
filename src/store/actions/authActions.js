export const loginUser = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(_ => dispatch({ type: 'LOGIN_SUCCESS' }))
            .catch(error => dispatch({ type: 'LOGIN_ERROR', error }));
    };
};

export const logoutUser = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .then(_ => dispatch({type: 'LOGOUT_SUCCESS'}));
    };
};

export const resetPassword = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(credentials.email)
            .then(_ => dispatch({ type: 'RESET_SUCCESS', message: 'A verification email is sent successfully.' }));
    };
};

export const registerUser = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(_ => {
                let uri = 'profile-pictures/' + credentials.photo.name;
                let ref = firebase.storage().ref().child(uri);
                ref.put(credentials.photo)
                    .then(_ => {
                        ref.getDownloadURL()
                            .then(url => {
                                firebase.auth().onAuthStateChanged(user => {
                                    user.updateProfile({
                                        photoURL: url,
                                        displayName: credentials.name
                                    }).then(_ => {
                                        let db = firebase.firestore();
                                        db.collection('users').doc(user.uid).set({
                                            admin: true,
                                            email: user.email,
                                            photo: user.photoURL,
                                            name: user.displayName,
                                            phone: credentials.phone,
                                            address: credentials.address
                                        }).then(_ => dispatch({ type: 'REGISTER_SUCCESS' }));
                                    }).catch(error => dispatch({ type: 'REGISTER_ERROR', error }));
                                });
                            }).catch(error => dispatch({ type: 'REGISTER_ERROR', error }));
                    }).catch(error => dispatch({ type: 'REGISTER_ERROR', error }));
            }).catch(error => dispatch({ type: 'REGISTER_ERROR', error }));
    };
};
