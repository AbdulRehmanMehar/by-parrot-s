import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteCategory } from '../../store/actions/itemActions';

class View extends Component{

    delete(event) {
        event.preventDefault();
        let id = event.target.id;
        let isParent = document.getElementById(id).getAttribute('isparent');
        let msg = isParent === 'true' ? 'You\'re trying to delete parent category. Are you sure?' : 'Are you sure?';
        if(window.confirm(msg)){
            this.props.delete(id);
        }
    }

    render() {
        let i = 1;
        let category;
        if(this.props.categories !== undefined){
            category = this.props.categories.map(cat => {
                let parent, child;
                if (cat.parent) parent = this.props.categories.filter(ca => ca.id === cat.parent)[0];
                child = this.props.categories.filter(ca => ca.parent === cat.id); 
                return (
                    <tr key={cat.id}>
                        <td>{i++}</td>
                        <td>{cat.name}</td>
                        <td>{parent ? parent.name : null}</td>
                        <td>
                            <Link to={"/manage-categories?section=edit&id=" + cat.id}>Edit</Link> | 
                            <Link to="#" onClick={this.delete.bind(this)} id={cat.id} isparent={child.length > 0 ? 'true' : 'false' }> Delete</Link>
                        </td>
                    </tr>
                )
            }) 
        }
        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Parent Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { category }
                    </tbody>
                </table>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        categories: state.firestore.ordered.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        delete: (id) => dispatch(deleteCategory(id))
    };
};

export default compose(
    firestoreConnect(['categories']),
    connect(mapStateToProps, mapDispatchToProps),
)(View);