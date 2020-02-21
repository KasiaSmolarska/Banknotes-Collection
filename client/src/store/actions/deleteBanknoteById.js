import axios from "axios";
import { BANKNOTE_ERROR } from "./types";
import actions from "./index";

const deleteBanknoteById = banknoteId => async dispatch => {
  try {
    await axios.delete(`/api/banknote/${banknoteId}`);

    dispatch(actions.fetchBanknotes());
    dispatch(
      actions.setAlert({
        type: "success",
        msg: "Banknote was deleted!"
      })
    );
    dispatch(actions.clearBanknoteData());
  } catch (err) {
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: "Something went wrong. Try again!"
      })
    );
    dispatch({
      type: BANKNOTE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export default deleteBanknoteById;
