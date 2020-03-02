import axios from "axios";
import { BANKNOTE_ERROR, FETCH_BANKNOTE_BY_ID } from "./types";
import actions from "./index";
import languages from "../../utils/languages";

const fetchBanknoteById = (banknoteId, history) => async dispatch => {
  const lang = localStorage.getItem("language") || "pl";
  try {
    const res = await axios.get(`/api/banknote/${banknoteId}`);
    dispatch({
      type: FETCH_BANKNOTE_BY_ID,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch(actions.clearBanknoteData());

    history.push("/banknotes");
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: languages[lang]["action.fetchBanknoteById.danger"],
        duration: 6000
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

export default fetchBanknoteById;
