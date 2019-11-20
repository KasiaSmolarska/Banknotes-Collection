import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import TranslateProvider from "./translate/TranslateProvider";

import reducers from "./store";
import "../src/scss/index.scss";
import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";

// import axios from "axios";
// window.axios = axios;

// const banknote = {
//   title: "456 my banknnote"
// };

// axios.get("/api/banknotes").then(data => console.log(data));

const middlewares = [applyMiddleware(reduxThunk)];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducers, {}, compose(...middlewares));

ReactDOM.render(
  <TranslateProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </TranslateProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
