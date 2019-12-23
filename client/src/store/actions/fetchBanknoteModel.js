import axios from "axios";
import { FETCH_BANKNOTE_MODEL } from "./types";

const fetchBanknoteModel = () => async dispatch => {
  const res = await axios.get("/api/banknoteModel");

  dispatch({ type: FETCH_BANKNOTE_MODEL, payload: res.data });
};

export default fetchBanknoteModel;
