import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

class Dashboard extends Component{   
    render(){
        if(!this.props.auth.uid) return <Redirect to="/login" />;
        return(
            <div className="container">
                <div className="jumbotron mt-4">
                    <h1 className="font-weight-light">Hello, {this.props.auth.displayName}!</h1>
                    <p className="lead">
                        Welcome to <b>By Parrot's</b>, the perfect place for parrot lovers.
                    </p>
                    <hr className="my-4" />
                    <p>Actions: </p>
                    <Link to="/update-profile" className="btn btn-primary mr-2">Update Profile</Link>
                    { this.props.profile.admin ? 
                        <span>
                            <Link to="manage-items" className="btn btn-primary mr-2">Manage Items</Link>
                            <Link to="manage-categories" className="btn btn-primary mr-2">Manage Categories</Link>
                            <Link to="view-orders"  className="btn btn-primary mr-2">View Orders</Link>
                        </span>
                    : null }
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users']),
)(Dashboard);