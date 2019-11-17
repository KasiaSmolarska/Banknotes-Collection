import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./store";
import "../src/scss/index.scss";
import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";

// import axios from "axios";
// window.axios = axios;

// const banknote = {
//   title: "my banknnote"
// };

// axios.post("/api/banknotes", banknote);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
