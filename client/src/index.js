import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import TranslateProvider from "./translate/TranslateProvider";
import { Alert } from "./components/Alert";

import reducers from "./store";
import "../src/scss/index.scss";
import "../node_modules/react-virtualized/styles.css";

import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";

// import axios from "axios";
// window.axios = axios;

// axios.put("/api/banknote/like/5e4cf7945a0bf63e0f998e54").then(data => console.log(data));

const middlewares = [applyMiddleware(reduxThunk)];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducers, {}, compose(...middlewares));

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
