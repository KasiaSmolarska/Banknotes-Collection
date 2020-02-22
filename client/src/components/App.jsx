import React, { Component, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import actions from "../store/actions";
import Header from "./Header";
import Landing from "./Landing";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { PrivateRoute } from "./routing/PrivateRoute";
import { BanknotePreview } from "./banknotePreview/BanknotePreview";
import BanknotesPage from "./BanknotesPage";
import EditForm from "./banknoteForm/EditForm";
import BanknoteForm from "./banknoteForm/BanknoteForm";

const getBanknote = state => state.banknote;

const Content = () => {
  const { showedModalToAddBanknote, showedModalToEditBanknote, banknote } = useSelector(getBanknote);
  return (
    <div>
      <Header />
      <Route exact path="/" component={Landing} />
      <PrivateRoute exact path="/banknotes/:banknoteId" component={BanknotePreview} />
      <PrivateRoute exact path="/banknotes" component={BanknotesPage} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />

      {showedModalToEditBanknote && banknote && <EditForm initialValues={banknote} />}

      {showedModalToAddBanknote && <BanknoteForm />}
    </div>
  );
};

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
        {showedModalToEditBanknote && banknote && <EditForm initialValues={banknote} />}

        {showedModalToAddBanknote && <BanknoteForm />}
      </BrowserRouter>
    </div>
  );
};

export default App;
