import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UpdateProfile from './components/UpdateProfile';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => {
    return isAuthenticated ? <Component {...props} /> : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />;
  }} />
);

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      currentuser: null,
      isAuthenticated: false,
    }
  }

  render() {
    let isAuthenticated = this.props.auth.uid !== null;
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={_ => <Dashboard user={this.state.currentuser} />} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/updateprofile" component={_ => <UpdateProfile user={this.state.currentuser} />} isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(App);