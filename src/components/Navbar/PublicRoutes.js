import React from 'react';
import { Link } from 'react-router-dom';

const PublicRoutes = (props) => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </ul>
    );
};

export default PublicRoutes;