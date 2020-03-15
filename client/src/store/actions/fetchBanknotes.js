import axios from "axios";
import { FETCH_BANKNOTES, BANKNOTE_ERROR, SET_SEARCH_PARAMS, SET_NUMBER_OF_PRODUCTS, SET_PAGINATION_SKIP, SET_FILTER_PARAMS } from "./types";
import actions from "./index";

export const fetchBanknotes = (newSkip = 0) => {
  return async (dispatch, getState) => {
    try {
      const query = getState().banknote.searchParams;
      const sortBy = getState().banknote.sortBy;
      const sortDirection = getState().banknote.sortDirection;
      const limit = getState().banknote.limit;
      const filters = getState().banknote.filters;

      const params = new URLSearchParams({
        query,
        sortBy,
        sortDirection,
        limit,
        skip: newSkip * limit,
        filters: JSON.stringify(filters)
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

      if (Object.keys(filters).length && res.data.items.length === 0) {
        const params = new URLSearchParams({
          sortBy,
          sortDirection
        });
        res = await axios.get(`/api/banknote?${params}`);

        dispatch({
          type: SET_FILTER_PARAMS,
          payload: {}
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
