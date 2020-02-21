import React, { Component, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import actions from "../store/actions";
import Header from "./Header";
import Landing from "./Landing";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { PrivateRoute } from "./routing/PrivateRoute";
import { BanknotePreview } from "./banknotePreview/BanknotePreview";
import EditForm from "./banknoteForm/EditForm";
import BanknoteForm from "./banknoteForm/BanknoteForm";

class Content extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Landing} />
        <PrivateRoute path="/banknotes/:banknoteId" component={BanknotePreview} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

const getBanknote = state => state.banknote;

const App = () => {
  const { showedModalToAddBanknote, showedModalToEditBanknote, banknote } = useSelector(getBanknote);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route component={Content} />
        </Switch>
      </BrowserRouter>
      {showedModalToEditBanknote && banknote && <EditForm initialValues={banknote} />}

      {showedModalToAddBanknote && <BanknoteForm />}
    </div>
  );
};

export default App;
