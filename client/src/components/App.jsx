import React, { Component, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import actions from "../store/actions";
import Header from "./Header";
import Landing from "./Landing";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { PrivateRoute } from "./routing/PrivateRoute";

class Content extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, []);
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
};

export default App;
