import axios from "axios";
import { SEARCH_BANKNOTES, BANKNOTE_ERROR } from "./types";
import actions from "./index";

const searchBanknotes = query => async dispatch => {
  try {
    const params = new URLSearchParams({
      query
    });
    const res = await axios.get(`/api/banknote?${params}`);

    if (res.data.length === 0) {
      return dispatch(
        actions.setAlert({
          msg: "No banknotes found",
          type: "danger",
          duration: 3000
        })
      );
    }

    dispatch({
      type: SEARCH_BANKNOTES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: BANKNOTE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const resetSearching = () => dispatch => {
  dispatch(actions.fetchBanknotes());
};

export default searchBanknotes;
