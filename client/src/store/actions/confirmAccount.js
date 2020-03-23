import axios from "axios";
import actions from "./index";

export const confirmAccount = email => async dispatch => {
  try {
    const lang = localStorage.getItem("language") || "pl";
    const valuesToSend = {
      email,
      lang
    };
    const res = await axios.post("/api/auth/confirm", valuesToSend);
    if (res.data.label === "tokenAlreadySent") {
      dispatch(
        actions.setAlert({
          type: "info",
          msg: "action.remindPassword.tokenAlreadySent.success",
          duration: 8000
        })
      );
    } else if (res.data.label === "accountConfirmed") {
      dispatch(
        actions.setAlert({
          type: "success",
          msg: "action.confirmAccount.success",
          duration: 8000
        })
      );
    }

    return "success";
  } catch (error) {
    console.log({ error });
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: "action.confirmAccount.danger",
        duration: 12000
      })
    );
    return "fail";
  }
};
