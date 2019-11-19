import axios from "axios";
import { FETCH_USER } from "./types";

const postBanknote = values => async dispatch => {
  const res = await axios.post("/api/banknote", values);
  console.log("val", values);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export default postBanknote;
