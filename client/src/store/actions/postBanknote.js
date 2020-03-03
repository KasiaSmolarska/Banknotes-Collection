import axios from "axios";
import actions from "./index";
import { BANKNOTE_ERROR } from "./types";

const postBanknote = values => async dispatch => {
  try {
    await axios.post("/api/banknote", values);
    dispatch(actions.fetchBanknotes());
    dispatch(
      actions.setAlert({
        type: "success",
        msg: "action.postBanknote.success"
      })
    );
  } catch (err) {
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: "action.postBanknote.danger"
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

export default postBanknote;
