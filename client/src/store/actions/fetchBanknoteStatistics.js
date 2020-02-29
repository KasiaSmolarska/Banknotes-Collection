import axios from "axios";
import { BANKNOTE_ERROR, FETCH_BANKNOTE_STATISTICS } from "./types";

const fetchBanknoteStatistics = () => async dispatch => {
  try {

    const res = await axios.get("/api/statistics/banknotes");
    dispatch({
      type: FETCH_BANKNOTE_STATISTICS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: BANKNOTE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }

}

export default fetchBanknoteStatistics;