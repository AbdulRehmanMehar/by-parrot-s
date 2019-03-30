const init = {};

const validationReducer = (state = init, action) => {
    switch (action.type) {
        case 'NAME_ERROR':
            return {
                ...state,
                nameError: action.message
            };
        case 'EMAIL_ERROR':
            return {
                ...state,
                emailError: action.message
            };
        case 'PHONE_ERROR':
            return {
                ...state,
                phoneError: action.message
            }
        case 'PHOTO_ERROR':
            return {
                ...state,
                photoError: action.message
            }
        case 'ADDRESS_ERROR':
            return {
                ...state,
                addressError: action.message
            }
        case 'PASSWORD_ERROR':
            return {
                ...state,
                passwordError: action.message
            }
        case 'MISMATCH_ERROR':
            return {
                ...state,
                mismatchError: action.message
            }
        case 'PRICE_ERROR':
            return {
                ...state,
                priceError: action.message
            }
        default:
            return state;
    }
};

export default validationReducer;