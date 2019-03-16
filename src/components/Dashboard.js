import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component{   
    render(){
        return(
            <div className="container">
                <div className="jumbotron mt-4">
                    <h1 className="font-weight-light">Hello, {this.props.user.displayName || 'Newbie'}!</h1>
                    <p className="lead">
                        Welcome to <b>By Parrot's</b>, the perfect place for parrot lovers.
                    </p>
                    <hr className="my-4" />
                    <p>Actions: </p>
                    <Link to="#" className="btn btn-primary">Update Profile</Link>
                    {/* <a class="btn btn-primary" href="#" role="button">Learn more</a> */}
                </div>
            </div>
        )
    }
}