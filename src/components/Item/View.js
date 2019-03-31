import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteItem } from '../../store/actions/itemActions';

class View extends Component{

    delete(event) {
        event.preventDefault();
        let id = event.target.id;
        this.props.delete(id);
    }

    render() {
        let item, i = 1;
        if(this.props.items !== undefined && this.props.categories !== undefined){
            item = this.props.items.map(item => {
                let category = this.props.categories.filter(cat => cat.id === item.category)[0];
                return (
                    <tr key={item.id}>
                        <td>{i++}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{category ? category.name : 'Uncategorized'}</td>
                        <td>
                            <Link to={"/manage-items?section=edit&id="+item.id}> Edit</Link> | 
                            <Link to="#" onClick={this.delete.bind(this)} id={item.id}> Delete</Link> 
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
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        items: state.firestore.ordered.items,
        categories: state.firestore.ordered.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        delete: (id) => dispatch(deleteItem(id))
    };
};

export default compose(
    firestoreConnect(['categories', 'items']),
    connect(mapStateToProps, mapDispatchToProps),
)(View);