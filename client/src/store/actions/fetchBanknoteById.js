import axios from "axios";
import { BANKNOTE_ERROR, FETCH_BANKNOTE_BY_ID } from "./types";

const fetchBanknoteById = banknoteId => async dispatch => {
  try {
    const res = await axios.get(`api/banknote/${banknoteId}`);

    dispatch({
      type: FETCH_BANKNOTE_BY_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BANKNOTE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export default fetchBanknoteById;
