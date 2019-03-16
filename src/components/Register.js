import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../Firebase';


export default class Regiser extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            photo: '',
            password: '',
            cpassword: '',
            errors: [], 
        }; 
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null) this.setState({ redirect: true });
            else this.setState({ redirect: false })
        });
    }

    setName(event) {
        let name = event.target.value;
        let errors = this.state.errors;
        let data = 'Name must minimum 3 characters long.';
        this.setState({name: name});
        if(name.length < 3){
            errors = errors.filter(error => error.type !== 'name' && error.data !== data);
            errors.push({type: 'name', data: data});
            this.setState({errors: errors});
        }else{
            errors = errors.filter(error => error.type !== 'name');
            this.setState({ errors: errors });
        }
    }

    setEmail(event) {
        let email = event.target.value;
        let errors = this.state.errors;
        let data = 'Please provide a valid email address.';
        this.setState({ email: email });
        // eslint-disable-next-line
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            errors = errors.filter(error => error.type !== 'email' && error.data !== data);
            errors.push({type: 'email', data: data});
            this.setState({errors: errors});
        }else{
            errors = errors.filter(error => error.type !== 'email');
            this.setState({ errors: errors });
        }
    }

    setPhoto(event) {
        let file = event.target.files[0];
        let ext = file.name.toLowerCase().split('.').pop();
        let errors = this.state.errors;
        let data = 'The select file doesn\'t seem a valid image file.';
        if(ext === 'jpg' || ext === 'png' || ext === 'gif' || ext === 'svg'){
            errors = errors.filter(error => error.type !== 'photo');
            this.setState({photo: file});
            this.setState({errors: errors});
        }else{
            errors = errors.filter(error => error.type !== 'photo' && error.data !== data);
            errors.push({type: 'photo', data: data});
            this.setState({errors: errors});
        }
    }

    setPassword(event) {
        let re = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,12}$/;
        let errors = this.state.errors;
        let password = event.target.value;
        let data = 'Your password must 8 - 12 characters long and must contain at least one number.';
        this.setState({ password: password });
        if(!re.test(password)){
            errors = errors.filter(error => error.type !== 'password' && error.data !== data);
            errors.push({ type: 'password', data: data});
            this.setState({ errors: errors });
        }else{
            errors = errors.filter(error => error.type !== 'password');
            this.setState({ errors: errors });
        }
    }

    setCpassword(event) {
        let errors = this.state.errors;
        let password = event.target.value;
        let data = 'Password and confirm password don\'t match.';
        this.setState({ cpassword: password });
        if (this.state.password !== password){
            errors = errors.filter(error => error.type !== 'password' && error.data !== data);
            errors.push({ type: 'password', data: data });
            this.setState({ errors: errors });
        } else {
            errors = errors.filter(error => error.type !== 'password');
            this.setState({ errors: errors });
        }
    }

    register(event) {
        let errors = this.state.errors;
        if (this.state.email === '' || this.state.password === '' || this.state.cpassword === '' || this.state.errors.length > 0){
            let data = 'It seems that the form is invalid.';
            errors = errors.filter(error => error.type !== 'general' && error.data !== data);
            errors.push({ type: 'general', data: data });
            this.setState({ errors: errors });
        }else{
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(response => {
                    let uid = this.state.email.split('@').unshift();
                    let ref = firebase.storage().ref().child('profile-picture/'+ uid + '_' +this.state.photo.name);
                    ref.put(this.state.photo)
                        .then(snapshot => {
                            ref.getDownloadURL()
                                .then(url => {
                                    firebase.auth().onAuthStateChanged(user => {
                                        user.updateProfile({
                                            photoURL: url,
                                            displayName: this.state.name
                                        }).then(_ => this.setState({redirect: true}));
                                    });
                                });
                        });
                }).catch(error => {
                    errors = errors.filter(err => err.type !== 'email' && err.data !== error.message);
                    errors.push({ type: 'email', data: error.message });
                    this.setState({ errors: errors });
                });
        }
        event.preventDefault();
    }

    render() {
        let nameErrors = '',
            emailErrors = '',
            photoErrors = '',
            passwordErrors = '',
            generalErrors = '';
        this.state.errors.forEach(error => {
            if (error.type === 'name') {
                nameErrors += `<small>${error.data}</small><br />`;
            }else if(error.type === 'email'){
                emailErrors += `<small>${error.data}</small><br />`;
            }else if(error.type === 'photo') {
                photoErrors += `<small>${error.data}</small><br />`;
            }else if(error.type === 'password'){
                passwordErrors += `<small>${error.data}</small><br />`;
            }else{
                generalErrors += `<small>${error.data}</small><br />`;
            }
        });
        if (this.state.redirect) return <Redirect to="/dashboard" />;
        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.register.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="name" className="form-control" id="name" placeholder="Jone Doe" min="5" onChange={this.setName.bind(this)} value={this.state.name} />
                                <div className="form-text text-danger" dangerouslySetInnerHTML={{ __html: nameErrors }}></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="jone@doe.io" onChange={this.setEmail.bind(this)} value={this.state.email} />
                                    <div className="form-text text-danger" dangerouslySetInnerHTML={{ __html: emailErrors }}></div>
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="customFile">Profile Picture</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile" accept="image/*" onChange={this.setPhoto.bind(this)} />
                                        <label className="custom-file-label" htmlFor="customFile">Choose photo</label>
                                    </div>
                                    <div className="form-text text-danger d-block" dangerouslySetInnerHTML={{ __html: photoErrors }}></div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="pwd">Password</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="*********" onChange={this.setPassword.bind(this)} value={this.state.password} />
                                    <div className="form-text text-danger" dangerouslySetInnerHTML={{ __html: passwordErrors }}></div>
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="cpwd">Confirm Password</label>
                                    <input type="password" className="form-control" id="cpwd" placeholder="*********" onChange={this.setCpassword.bind(this)} value={this.state.cpassword} />
                                </div>
                            </div>
                            <div className="form-text text-danger" dangerouslySetInnerHTML={{ __html: generalErrors }}></div>
                            <button type="submit" className="btn btn-primary" disabled={this.state.errors.length > 0 || this.state.name === '' || this.state.email === '' || this.state.photo === '' || this.state.password === '' || this.state.cpassword === ''}>Regiser</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}