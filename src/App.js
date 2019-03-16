import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import firebase from './Firebase';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />;
    }
  }} />
);

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (isAuthenticated) {
      return <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }} />;
    } else {
      return <Component {...props} />;
    }
  }} />
);

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      currentuser: null,
      isAuthenticated: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({currentuser: user});
      if(user !== null) this.setState({isAuthenticated: true});
    });
  }

  logoutUser(event) {
    firebase.auth().signOut().then(resp => {
      this.setState({ isAuthenticated: false });
    }).catch(error => {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    let c_links;
    if(this.state.currentuser === null){
      c_links = <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
      </ul>;
    }else{
      c_links = <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout" onClick={this.logoutUser.bind(this)}>Logout</Link>
        </li>
      </ul>;
    }
    return (
      <Router>
        <div>
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
              { c_links }
            </div>
          </nav>
          <Route exact path="/" component={Home} />
          <PublicRoute path="/login" component={Login} isAuthenticated={this.state.isAuthenticated} />
          <PublicRoute path="/register" component={Register} isAuthenticated={this.state.isAuthenticated} />
          <PrivateRoute path="/dashboard" component={_ => <Dashboard user={this.state.currentuser} />} isAuthenticated={this.state.isAuthenticated} />
        </div>
      </Router>
    )
  }
}

