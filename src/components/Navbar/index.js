import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const Navbar = (props) => {
    let routes = props.auth.uid ? <ProtectedRoutes /> : <PublicRoutes />;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">By Parrot's</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    <li>
                        <form className="form-inline mt-1">
                            <input className="form-control form-control-sm mr-sm-2" type="search" placeholder="Cockatoo" aria-label="Search" />
                            <button className="btn btn-sm btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </li>
                </ul>
                {routes}
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