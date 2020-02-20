import axios from "axios";
import actions from "./index";
import { BANKNOTE_ERROR } from "./types";

const updateBanknote = (banknoteId, values) => async dispatch => {
  try {
    await axios.post(`/api/banknote/${banknoteId}`, values);
    console.log(banknoteId, values);
    dispatch(actions.fetchBanknotes());
    dispatch(
      actions.setAlert({
        type: "success",
        msg: "Banknote was updated!"
      })
    );
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

export default updateBanknote;
