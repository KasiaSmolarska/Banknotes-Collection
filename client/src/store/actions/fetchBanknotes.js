import axios from "axios";
import { FETCH_BANKNOTES, BANKNOTE_ERROR, SET_SEARCH_PARAMS, SET_NUMBER_OF_PRODUCTS, SET_PAGINATION_SKIP } from "./types";
import actions from "./index";

export const fetchBanknotes = (newSkip = 0) => {
  return async (dispatch, getState) => {
    try {
      const query = getState().banknote.searchParams;
      const sortBy = getState().banknote.sortBy;
      const sortDirection = getState().banknote.sortDirection;
      const limit = getState().banknote.limit;

      const params = new URLSearchParams({
        query,
        sortBy,
        sortDirection,
        limit,
        skip: newSkip * limit
      });

      let res = await axios.get(`/api/banknote?${params}`);

      if (query && res.data.items.length === 0) {
        const params = new URLSearchParams({
          sortBy,
          sortDirection
        });
        res = await axios.get(`/api/banknote?${params}`);

        dispatch({
          type: SET_SEARCH_PARAMS,
          payload: ""
        });

        dispatch(
          actions.setAlert({
            type: "danger",
            msg: "action.fetchBanknotes.danger",
            duration: 6000
          })
        );
      }

      dispatch({
        type: FETCH_BANKNOTES,
        payload: res.data.items
      });

      dispatch({
        type: SET_NUMBER_OF_PRODUCTS,
        payload: res.data.total
      });

      dispatch({
        type: SET_PAGINATION_SKIP,
        payload: newSkip
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
};

export default fetchBanknotes;
