const init = {
    info: null,
    emailError: null,
    passwordError: null,
};

const authReducer = (state = init, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            if(action.error.code === 'auth/user-not-found'){
                return { emailError: action.error.message };
            }else{
                return { passwordError: action.error.message };
            }
        case 'LOGIN_SUCCESS':
            return { emailError: null, passwordError: null };
        case 'RESET_SUCCESS':
            return { info: action.message }
        case 'REGISTER_SUCCESS':
            return { info: 'Registeration was successful.You may now login.' }
        case 'REGISTER_ERROR':
            return {regError: action.error.message}
        case 'GOT_USER':
            return {user: action.user}
        default:
            return state;
    }
};

export default authReducer;