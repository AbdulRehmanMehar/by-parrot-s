import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { loginUser, resetPassword } from '../store/actions/authActions';
 
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    setEmail(event) {
        this.setState({ email: event.target.value });
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    handlePwdReset(event) {
        event.preventDefault();
        this.props.resetPwd(this.state);
    }

    login(event) {
        event.preventDefault();
        this.props.login(this.state);
    }

    render() {
        if(this.props.auth.uid) return <Redirect to="/dashboard" />;
        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form onSubmit={this.login.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={this.setEmail.bind(this)} />
                                <small className="form-text text-danger">
                                    { this.props.emailError }
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.setPassword.bind(this)} />
                                <small className="form-text text-danger">
                                    { this.props.passwordError }
                                    { 
                                        this.props.passwordError !== null ? 
                                            <span 
                                                onClick={this.handlePwdReset.bind(this)} 
                                                style={{color: "#00f", float: "right", cursor: "pointer"}}>
                                                Forgot Password?
                                            </span> 
                                        :   null 
                                    }
                                </small>
                            </div>
                            <small className="form-text mb-2 text-success">
                                {this.props.info}
                            </small>
                            <button type="submit" className="btn btn-primary" disabled={this.state.email === '' || this.state.password === ''}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.auth.info,
        auth: state.firebase.auth,
        emailError: state.auth.emailError,
        passwordError: state.auth.passwordError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentails) => dispatch(loginUser(credentails)),
        resetPwd: (credentails) => dispatch(resetPassword(credentails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);