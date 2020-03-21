import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import TranslateProvider from "./translate/TranslateProvider";
import { Alert } from "./components/Alert";

import reducers from "./store";
import "../node_modules/react-virtualized/styles.css";
import "../src/scss/index.scss";

import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";

import axios from "axios";
window.axios = axios;

// axios.post("/auth/register", {email: "test22ew@test.pl", password: "test", password2: "test"}).then(data => console.log(data));

const middlewares = [applyMiddleware(reduxThunk)];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }));
}

const store = createStore(reducers, {}, compose(...middlewares));

console.log(window.location.hash)

ReactDOM.render(
  <TranslateProvider>
    <Provider store={store}>
      <App />
      <div className="alert__container">
        <Alert />
      </div>
    </Provider>
  </TranslateProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
