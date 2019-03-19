export const validateName = (name) => {
    return (dispatch) => {
        if(name.length < 3) dispatch({ type: 'NAME_ERROR', message: 'Name must 3 or more characters long.' });
        else dispatch({ type: 'NAME_ERROR' });
    };
};

export const validateEmail = (email) => {
    return (dispatch) => {
        // eslint-disable-next-line
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) dispatch({ type: 'EMAIL_ERROR', message: 'Please provide a valid email address.' });
        else dispatch({ type: 'EMAIL_ERROR' })
    };
};

export const validatePhone = (phone) => {
    return (dispatch) => {
        let re = /^(\+|00){0,2}(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
        if(!re.test(phone)) dispatch({ type: 'PHONE_ERROR', message: 'Please provide a valid phone number.' });
        else dispatch({ type: 'PHONE_ERROR' });
    };
};

export const validatePhoto = (photo) => {
    return (dispatch) => {
        console.log(photo);
        if (!photo) return dispatch({ type: 'PHOTO_ERROR', message: 'Invalid file has been selected.' });
        let ext = photo.name.toLowerCase().split('.').pop();
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif' || ext === 'svg') dispatch({ type: 'PHOTO_ERROR' });
        else dispatch({ type: 'PHOTO_ERROR', message: 'Invalid file has been selected.' });
    };
};

export const validateAddress = (address) => {
    return (dispatch) => {
        if(address.length < 50) dispatch({ type:'ADDRESS_ERROR', message: 'Please provide full address. (50 characters minimum)' });
        else dispatch({ type: 'ADDRESS_ERROR' });
    };
};

export const validatePassword = (password) => {
    return (dispatch) => {
        let re = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,12}$/;
        if (!re.test(password))
            dispatch({ type: 'PASSWORD_ERROR', message: 'Your password must 8 - 12 characters long and must contain at least one number.' });
        else dispatch({ type: 'PASSWORD_ERROR' });
    };
};

export const validateMatch = (first, second) => {
    return (dispatch) => {
        if(first !== second) dispatch({ type: 'MISMATCH_ERROR', message: 'Fields don\'t match.' });
        else dispatch({ type: 'MISMATCH_ERROR' });
    };
};