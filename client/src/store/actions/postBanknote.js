import axios from "axios";
import actions from "./index";
import { BANKNOTE_ERROR } from "./types";
import languages from "../../utils/languages";

const postBanknote = values => async dispatch => {
  const lang = localStorage.getItem("language") || "pl";
  try {
    await axios.post("/api/banknote", values);
    dispatch(actions.fetchBanknotes());
    dispatch(
      actions.setAlert({
        type: "success",
        msg: languages[lang]["action.postBanknote.success"]
      })
    );
  } catch (err) {
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: languages[lang]["action.postBanknote.danger"]
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
