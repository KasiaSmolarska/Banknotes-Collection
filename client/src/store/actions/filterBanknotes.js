import { SET_FILTER_PARAMS } from "./types";
import actions from "./index";

const filterBanknotes = query => dispatch => {
  console.log(query);
  dispatch({
    type: SET_FILTER_PARAMS,
    payload: query
  });
  dispatch(actions.fetchBanknotes());
};

export const resetFiltering = () => dispatch => {
  dispatch({
    type: SET_FILTER_PARAMS,
    payload: ""
  });
  dispatch(actions.fetchBanknotes());
};

export default filterBanknotes;
