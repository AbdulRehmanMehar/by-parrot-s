const init = {
    items: [
        { id: '1', title: 'Cocktail', price: 700, description: 'Lorem ipsum dolor sit amet.' },
        { id: '2', title: 'Cocktoo', price: 700, description: 'Lorem ipsum dolor sit amet.' },
        { id: '3', title: 'Photohari', price: 700, description: 'Lorem ipsum dolor sit amet.' },
        { id: '4', title: 'Astrillian', price: 700, description: 'Lorem ipsum dolor sit amet.' }
    ]
};

const itemReducer = (state = init, action) => {
    switch(action.type){
        case 'CATEGORY_ERROR':
            return {
                ...state,
                categoryError: action.message
            }
        case 'CATEGORY_SUCCESS':
            return {
                ...state,
                categoryError: null,
                categorySuccess: action.message
            }
        default:
            return state;
    }
};

export default itemReducer;