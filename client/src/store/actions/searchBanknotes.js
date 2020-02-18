import axios from "axios";
import { SEARCH_BANKNOTES } from "./types";
import actions from "./index";

const searchBanknotes = query => async dispatch => {
  const params = new URLSearchParams({
    query
  });
  const res = await axios.get(`/api/banknote?${params}`);

  dispatch({
    type: SEARCH_BANKNOTES,
    payload: res.data
  });
};

export const resetSearching = () => dispatch => {
  dispatch(actions.fetchBanknotes());
};

export default searchBanknotes;
