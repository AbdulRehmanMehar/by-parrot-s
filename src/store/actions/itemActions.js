export const createItem = (item) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CREATE_ITEM', item });
    };
};

export const createCategory = (category) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        let ref = firestore.collection('categories');
        let qry = ref.where("name", "==", category.name).get();
        qry.then(querySnapshot => {
            let is = false;
            querySnapshot.docs.forEach(doc => {
                if(doc.exists) is = true;
            });
            if(is){
                return dispatch({ type:  'CATEGORY_ERROR', message: 'Category already exists.' });
            }else{
                ref.add({
                    name: category.name,
                    parent: category.parent
                }).then(_ => dispatch({ type: 'CATEGORY_SUCCESS', message: 'Category added successfully.' }));
            }
        });
    };
};

export const deleteCategory = (id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const ref = firestore.collection('categories').doc(id);
        const ref1 = firestore.collection('categories').where('parent', '==', id).get();
        ref.delete()
            .then(_ => dispatch({ type: 'CATEGORY_SUCCESS' }));
        ref1.then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                firestore.collection('categories').doc(doc.id)
                    .set({
                        parent: ''
                    }, { merge: true });
            });
        });
    };
};