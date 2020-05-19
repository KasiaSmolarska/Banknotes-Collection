import axios from "axios";
import actions, { AppThunk } from "./index";
import {History} from "history"

export const validatePasswordResetToken = (passwordToken: string, history: History): AppThunk => async dispatch => {
  try {
    await axios.get(`/api/auth/reset/${passwordToken}`);
  } catch (error) {
    console.log({ error });
    history.push("/login");
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: "action.validatePasswordResetToken.danger",
        duration: 8000
      })
    );
  }
};
