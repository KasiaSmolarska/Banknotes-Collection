import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v1 as uuidv1 } from "uuid";

import languages from "../../utils/languages";
import { currentLang } from "../../utils/languages";
import { AppThunk } from ".";

interface setAlertParams {
  msg: string;
  type: string;
  duration?: number;
}

export const setAlert = ({ msg, type, duration = 2000 }: setAlertParams): AppThunk => (dispatch) => {
  const id = uuidv1();
  setTimeout(() => dispatch(removeAlert(id)), duration);

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg: languages[currentLang()][msg] || msg,
      type,
    },
  });
};

export const removeAlert = (id: string) => {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};
