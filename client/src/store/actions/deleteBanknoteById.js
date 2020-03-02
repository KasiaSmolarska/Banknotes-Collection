import axios from "axios";
import { BANKNOTE_ERROR } from "./types";
import actions from "./index";
import languages from "../../utils/languages";

const deleteBanknoteById = banknoteId => async dispatch => {
  const lang = localStorage.getItem("language") || "pl";
  try {
    await axios.delete(`/api/banknote/${banknoteId}`);
    dispatch(actions.fetchBanknotes());
    dispatch(
      actions.setAlert({
        type: "success",
        msg: languages[lang]["action.deleteBanknoteById.success"]
      })
    );
    dispatch(actions.clearBanknoteData());
  } catch (err) {
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: languages[lang]["action.deleteBanknoteById.danger"]
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
