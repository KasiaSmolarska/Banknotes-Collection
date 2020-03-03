import axios from "axios";
import actions from "./index";
import { BANKNOTE_ERROR } from "./types";

const updateBanknote = (banknoteId, values) => async dispatch => {
  try {
    await axios.post(`/api/banknote/${banknoteId}`, values);
    dispatch(
      actions.setAlert({
        type: "success",
        msg: "action.updateBanknote.success"
      })
    );
  } catch (err) {
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: "action.updateBanknote.danger"
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
