import axios from "axios";
import actions, { AppThunk } from "./index";
import { History } from "history";
import { Values } from "../../components/ResetPassword";

export const resetPassword = (values: Values, passwordToken: string, history: History): AppThunk => async (dispatch) => {
  try {
    const lang = localStorage.getItem("language") || "pl";
    const valuesToSend = {
      ...values,
      lang,
    };
    await axios.post(`/api/auth/reset/${passwordToken}`, valuesToSend);
    dispatch(
      actions.setAlert({
        type: "success",
        msg: "action.resetPassword.success",
        duration: 8000,
      })
    );

    history.push("/login");
  } catch (error) {
    console.log({ error });
    if (error.response.status === 409) {
      return dispatch(
        actions.setAlert({
          type: "danger",
          msg: "action.resetPassword.danger.email",
          duration: 8000,
        })
      );
    }
    if (error.response.status === 422) {
      return dispatch(
        actions.setAlert({
          type: "danger",
          msg: "action.registerUser.password.danger",
          duration: 8000,
        })
      );
    }
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: "action.resetPassword.danger",
        duration: 8000,
      })
    );
  }
};
