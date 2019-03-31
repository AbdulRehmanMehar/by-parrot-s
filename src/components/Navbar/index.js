import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const Navbar = (props) => {
    let routes = props.auth.uid ? <ProtectedRoutes /> : <PublicRoutes />;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">By Parrot's</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {routes}
                </div>
            </div>
        </nav>

    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default connect(mapStateToProps)(Navbar);