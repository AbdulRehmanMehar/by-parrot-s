import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../Firebase';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: [],
            redirect: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null) this.setState({ redirect: true });
            else this.setState({ redirect: false })
        });
    }

    setEmail(event) {
        this.setState({ email: event.target.value });
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    handlePwdReset(event) {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(_ => {
                let errors = [];
                let data = 'Password reset instructions were sent on the email you provided.';
                errors.filter(error => error.type !== 'general' && error.data !== data);
                errors.push({type: 'general', data: data});
                this.setState({errors: errors})
            }).catch(error => console.error(error));
        event.preventDefault();
    }

    login(event) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => this.setState({redirect: true}))
            .catch(error => {
                console.log(error);
                let code = (error.code.split('/').pop() === 'user-not-found') ? 'email' : 'password';
                let data = error.message;
                let errors = [];
                errors.push({type: code, data: data});
                this.setState({errors: errors});
            });
        event.preventDefault();
    }

    render() {
        let general = '',
            emailErrors = '',
            passwordErrors = '',
            passwordResetLink;
        this.state.errors.forEach(error => {
            if(error.type === 'general'){
                general += `<small>${error.data}</small><br />`;
            }else if(error.type === 'email'){
                emailErrors += `<small>${error.data}</small><br />`;
            }else{
                passwordErrors += `<small>${error.data}</small><br />`;
                passwordResetLink = <span onClick={this.handlePwdReset.bind(this)} style={{float: "right", color: "#00f", cursor: "pointer"}}>Reset Password?</span>;
            }
        });
        if(this.state.redirect) return <Redirect to="/dashboard" />;
        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form onSubmit={this.login.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={this.setEmail.bind(this)} />
                                <div className="form-text text-danger" dangerouslySetInnerHTML={{ __html: emailErrors }}></div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.setPassword.bind(this)} />
                                <div className="d-inline form-text text-danger" dangerouslySetInnerHTML={{ __html: passwordErrors }}></div>
                                <small>{passwordResetLink}</small>
                            </div>
                            <div className="form-text text-success" dangerouslySetInnerHTML={{ __html: general }}></div>                            
                            <button type="submit" className="btn btn-primary" disabled={this.state.email === '' || this.state.password === ''}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}