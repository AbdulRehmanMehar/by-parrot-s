import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Item from './components/Item';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/Category';
import Dashboard from './components/Dashboard';
import UpdateProfile from './components/UpdateProfile';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/update-profile" component={UpdateProfile} />
          <Route path="/manage-items" component={Item} />
          <Route path="/manage-categories" component={Category} />
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