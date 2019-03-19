import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../store/actions/authActions';
import { validateName, validateEmail, validatePhoto, validatePassword, validateMatch, validateAddress, validatePhone } from '../store/actions/validationActions';


class Regiser extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            photo: '',
            address: '',
            password: '',
            cpassword: '',
        }; 
    }

    setName(event) {
        let name = event.target.value;
        this.setState({ name: name });
        this.props.name(name);
    }

    setEmail(event) {
        let email = event.target.value;
        this.setState({ email: email });
        this.props.email(email);
    }

    setPhone(event) {
        let phone = event.target.value;
        this.setState({ phone: phone });
        this.props.phone(phone);
    }

    setPhoto(event) {
        let file = event.target.files[0];
        this.setState({ photo: file });
        this.props.photo(file);
        if(file) {
            document.getElementById('customFileLabel').innerText = file.name;
        }else{
            document.getElementById('customFileLabel').innerText = 'Choose Photo';
        }
    }

    setPassword(event) {
        let password = event.target.value;
        this.setState({ password: password });
        this.props.password(password);
    }

    setCpassword(event) {
        let cpwd = event.target.value;
        this.setState({ cpassword: cpwd });
        this.props.match(this.state.password, cpwd);
    }

    setAddress(event) {
        let address = event.target.value;
        this.setState({ address: address });
        this.props.address(address);
    }

    register(event) {
        event.preventDefault();
        this.props.register(this.state);
    }

    render() {
        if (this.props.auth.uid) return <Redirect to="/dashboard" />;
        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.register.bind(this)}>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="name">Name</label>
                                    <input type="name" className="form-control" id="name" placeholder="Jone Doe" min="5" onChange={this.setName.bind(this)} value={this.state.name} />
                                    <small className="form-text text-danger">{this.props.nameError}</small>
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="jone@doe.io" onChange={this.setEmail.bind(this)} value={this.state.email} />
                                    <small className="form-text text-danger">{this.props.emailError}</small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="number" className="form-control" id="phone" placeholder="+92 300 1234567" onChange={this.setPhone.bind(this)} value={this.state.phone} />
                                    <small className="form-text text-danger">{this.props.phoneError}</small>
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="customFile">Profile Picture</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile" accept="image/*" onChange={this.setPhoto.bind(this)} />
                                        <label className="custom-file-label" id="customFileLabel" htmlFor="customFile">Choose photo</label>
                                    </div>
                                    <small className="form-text text-danger d-block">{this.props.photoError}</small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="pwd">Password</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="*********" onChange={this.setPassword.bind(this)} value={this.state.password} />
                                    <small className="form-text text-danger">{this.props.passwordError || this.props.mismatchError}</small>
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="cpwd">Confirm Password</label>
                                    <input type="password" className="form-control" id="cpwd" placeholder="*********" onChange={this.setCpassword.bind(this)} value={this.state.cpassword} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Shipping Address</label>
                                <textarea className="form-control" id="address" placeholder="Satellite Town Gujranwala Pakistan" onChange={this.setAddress.bind(this)}>{this.state.address}</textarea>
                                <small className="form-text text-danger">{this.props.addressError}</small>
                            </div>
                            <small className="form-text mb-2 text-danger">{ this.props.regError }</small>
                            <button type="submit" className="btn btn-primary"
                                disabled={
                                    !this.state.name || 
                                    !this.state.email || 
                                    !this.state.phone || 
                                    !this.state.photo || 
                                    !this.state.address || 
                                    !this.state.password || 
                                    !this.state.cpassword ||
                                    this.props.nameError ||
                                    this.props.emailError ||
                                    this.props.phoneError ||
                                    this.props.photoError ||
                                    this.props.addressError ||
                                    this.props.passwordError ||
                                    this.props.mismatchError 
                            }>
                                Regiser
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        regError: state.auth.regError,
        nameError: state.validator.nameError,
        emailError: state.validator.emailError,
        phoneError: state.validator.phoneError,
        photoError: state.validator.photoError,
        addressError: state.validator.addressError,
        passwordError: state.validator.passwordError,
        mismatchError: state.validator.mismatchError,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        name: (name) => dispatch(validateName(name)),
        match: (x, y) => dispatch(validateMatch(x, y)),
        email: (email) => dispatch(validateEmail(email)),
        phone: (phone) => dispatch(validatePhone(phone)),
        photo: (photo) => dispatch(validatePhoto(photo)),
        address: (add) => dispatch(validateAddress(add)),
        password: (password) => dispatch(validatePassword(password)),
        register: (credentials) => dispatch(registerUser(credentials)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Regiser);