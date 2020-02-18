import axios from "axios";
import { SET_SEARCH_PARAMS } from "./types";
import actions from "./index";

const searchBanknotes = query => dispatch => {
  dispatch({
    type: SET_SEARCH_PARAMS,
    payload: query
  });
  dispatch(actions.fetchBanknotes());
};

export const resetSearching = () => dispatch => {
  dispatch({
    type: SET_SEARCH_PARAMS,
    payload: ""
  });
  dispatch(actions.fetchBanknotes());
};

export default searchBanknotes;
