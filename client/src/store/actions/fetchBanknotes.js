import axios from "axios";
import { FETCH_BANKNOTES, BANKNOTE_ERROR } from "./types";
import actions from "./index";

export const fetchBanknotes = () => {
  return async (dispatch, getState) => {
    try {
      const query = getState().banknote.searchParams;
      const sortBy = getState().banknote.sortBy;
      const sortDirection = getState().banknote.sortDirection;

      const params = new URLSearchParams({
        query,
        sortBy,
        sortDirection
      });


      let res = await axios.get(`/api/banknote?${params}`);

      if (query && res.data.length === 0) {
        const params = new URLSearchParams({
          sortBy,
          sortDirection
        });
        res = await axios.get(`/api/banknote?${params}`);

        dispatch(actions.setAlert({
          type: "danger",
          msg: "Sorry. No results found. Try different keywords.",
          duration: 6000
        }))
      }

      dispatch({
        type: FETCH_BANKNOTES,
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
};

export default fetchBanknotes;
