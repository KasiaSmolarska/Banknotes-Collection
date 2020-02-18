import { SET_SORT } from "./types";
import actions from "./index";

export const sortBanknotes = (sortBy, sortDirection) => dispatch => {
  dispatch({
    type: SET_SORT,
    payload: {
      sortDirection,
      sortBy
    }
  });
  dispatch(actions.fetchBanknotes());
};
