import axios from "axios";

import actions from "./index.js";
const postBanknote = values => async dispatch => {
  await axios.post("/api/banknote", values);
  dispatch(actions.fetchBanknotes());
};

export default postBanknote;
