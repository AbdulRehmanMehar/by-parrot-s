export const createItem = (item) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const uri = 'item-pictures/' + item.title.toLowerCase().replace(' ', '')
                     + '_' + item.photo.name.replace(' ', '').replace('?', '');
        const sref = firebase.storage().ref().child(uri)
        const dbref = firebase.firestore().collection('items');
        sref.put(item.photo)
            .then(_ => {
                sref.getDownloadURL()
                    .then(uri => {
                        dbref.add({
                            title: item.title,
                            photo: uri,
                            price: item.price,
                            category: item.category,
                            description: item.description
                        }).then(_ => {
                            dispatch({ type: 'ITEM_SUCCESS', message: 'Item was added successfully.' });
                        }); 
                    });
            }).catch(error => dispatch({ type: 'ITEM_ERROR', message: error.message }));
                
    };
};

export const deleteItem = (id) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const ref = firebase.firestore().collection('items').doc(id);
        ref.get()
            .then(doc => {
                if(doc.exists){
                    let raw = decodeURIComponent(doc.data().photo).split('/').pop();
                    let endIdx = raw.indexOf('?');
                    let photo = raw.substring(0, endIdx);
                    const stref = firebase.storage().ref().child('item-pictures/' + photo);
                    ref.delete()
                        .then(_ => {
                            stref.delete()
                                .then(_ => dispatch({ type: 'ITEM_SUCCESS' }));
                        });
                }
            });
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

export const updateCategory = (category) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const ref = firestore.collection('categories'); 
        ref.doc(category.id).update({
            name: category.name,
            parent: category.parent
        }).then(_ => dispatch({ type: 'CATEGORY_SUCCESS', message: 'Update was successfull.' }));
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
