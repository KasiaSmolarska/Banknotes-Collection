import { BANKNOTE_ERROR } from "./types";
import axios from "axios";
import actions from "./index";

const toggleBanknotesLike = id => async dispatch => {
  try {
    const favorite = await axios.put(`/api/banknote/like/${id}`);
    dispatch(
      actions.setAlert({
        type: favorite.data ? "success" : "info",
        msg: favorite.data ? "action.toggleBanknotesLike.success" : "action.toggleBanknotesLike.info",
        duration: 3500
      })
    );

    dispatch(actions.fetchBanknotes());
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

export default toggleBanknotesLike;
