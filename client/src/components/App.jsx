import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import actions from "../store/actions";
import Header from "./Header";
import Landing from "./Landing";
import LoginPage from "./LoginPage";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Route path="/" render={props => props.location.pathname !== "/login" && <Header />}></Route>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={LoginPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
