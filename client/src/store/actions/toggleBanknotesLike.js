import { BANKNOTE_ERROR } from "./types";
import axios from "axios";
import actions from "./index";
import languages from "../../utils/languages";

const toggleBanknotesLike = id => async dispatch => {
  const lang = localStorage.getItem("language") || "pl";
  try {
    const favorite = await axios.put(`/api/banknote/like/${id}`);
    dispatch(
      actions.setAlert({
        type: favorite.data ? "success" : "info",
        msg: favorite.data ? languages[lang]["action.toggleBanknotesLike.success"] : languages[lang]["action.toggleBanknotesLike.info"],
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
