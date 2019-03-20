import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Item extends Component {
    render() {
        if (!this.props.auth.uid) return <Redirect to="/login" />;
        if (this.props.profile.admin !== undefined && !this.props.profile.admin) 
            return <Redirect to="/dashboard" />;
        return (
            <div className="container">
                <h1>Hey</h1>
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

export default connect(mapStateToProps)(Item);