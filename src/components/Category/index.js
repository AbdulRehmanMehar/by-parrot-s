import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Add from './Add';
import View from './View';
import Edit from './Edit';

class Category extends Component {

    render() {
        let header, 
            component;
        let params = new URLSearchParams(this.props.location.search);
        if (!this.props.auth.uid) return <Redirect to="/login" />;
        if (this.props.profile.admin !== undefined && !this.props.profile.admin) return <Redirect to="/dashboard" />;
        if (params.get('section') === null) {
            header = 'Manage Categories';
        }else{
            header = <span>
                <Link to="/manage-categories">
                    Manage Categories
                </Link> / 
                <span style={{textTransform: 'capitalize'}}> {params.get('section')}</span>
            </span>;
        }
        
        if(params.get('section') === 'add'){
            component = <Add />
        }else if(params.get('section') === 'edit'){
            component = <Edit id={params.get('id')} />
        }else if(params.get('section') === 'view'){
            component = <View />

        }else{
            component = <div>
                <p>
                    In this section, you'll be creating, modifying or deleting categories.
                    A Category is a collection of items of same type.A category will have a name and a parent category (if any).
                </p>
                <Link to="/manage-categories?section=add" className="btn btn-info mr-2">
                    Add Category
                </Link>
                <Link to="/manage-categories?section=view" className="btn btn-info mr-2">
                    View Categories
                </Link>
            </div>;
        }

        return (
            <div className="container mt-4">
                <div className="card" style={{ maxWidth: 70 + '%', margin: '0 auto' }}>
                    <div className="card-header">{header}</div>
                    <div className="card-body">{component}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

export default connect(mapStateToProps)(Category);