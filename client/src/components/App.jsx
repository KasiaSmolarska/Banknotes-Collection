import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import actions from "../store/actions";
import Header from "./Header";
import Landing from "./Landing";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import BanknoteNew from "./BanknoteNew";

class Content extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/add" component={BanknoteNew} />
      </div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route component={Content} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
