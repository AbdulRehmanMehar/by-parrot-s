import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../store/actions/authActions';

const ProtectedRoutes = (props) => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <span className="nav-link" style={{cursor: "pointer"}} onClick={props.logout}>Logout</span>
            </li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutUser())
    };
};

export default connect(null, mapDispatchToProps)(ProtectedRoutes);