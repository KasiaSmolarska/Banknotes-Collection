import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { Page404 } from "./404Page";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";
import { ProfilePage } from "./ProfilePage";

const getBanknote = state => state.banknote;

const Content = () => {
  return (
    <div>
      <Header />
      <Switch>
        <PrivateRoute exact path="/banknotes/:banknoteId" component={BanknotePreview} />
        <PrivateRoute exact path="/banknotes" component={BanknotesPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
};

const App = () => {
  const { showedModalToAddBanknote, showedModalToEditBanknote, banknote, imageModal } = useSelector(getBanknote);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <React.Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={Landing} />
            <Route component={Content} />
          </Switch>
          {showedModalToEditBanknote && banknote && <EditForm initialValues={banknote} />}

          {showedModalToAddBanknote && <BanknoteForm />}

          {imageModal.show && (
            <Modal title={imageModal.title} type="compact" onSubmit={false} onClose={() => dispatch(actions.toggleImageModal())}>
              {!imageModal.loading ? (
                <img src={imageModal.src} alt="" />
              ) : (
                <>
                  <Spinner />
                </>
              )}
            </Modal>
          )}
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};

export default App;
