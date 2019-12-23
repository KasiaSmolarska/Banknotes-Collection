import axios from "axios";
import { FETCH_BANKNOTES } from "./types";

export const fetchBanknotes = () => {
  return async dispatch => {
    const res = await axios.get("/api/banknote");
    dispatch({ type: FETCH_BANKNOTES, payload: res.data });
  };
};

export default fetchBanknotes;
