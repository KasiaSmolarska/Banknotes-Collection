import axios from "axios";
import actions from "./index";

export const remindPassword = values => async dispatch => {
  try {
    const lang = localStorage.getItem("language") || "pl";
    const valuesToSend = {
      ...values,
      lang
    };
    const res = await axios.post("/auth/recover", valuesToSend);

    if (res.data.label === "tokenAlreadySent") {
      dispatch(
        actions.setAlert({
          type: "info",
          msg: "action.remindPassword.tokenAlreadySent.success",
          duration: 8000
        })
      );
    } else {
      dispatch(
        actions.setAlert({
          type: "success",
          msg: "action.remindPassword.success",
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
        msg: "action.remindPassword.danger",
        duration: 8000
      })
    );
    return "fail";
  }
};
