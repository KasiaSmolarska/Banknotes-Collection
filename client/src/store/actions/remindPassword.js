import axios from "axios";
import actions from "./index";

export const remindPassword = (values) => async (dispatch) => {
  try {
    const lang = localStorage.getItem("language") || "pl";
    const valuesToSend = {
      ...values,
      lang
    }
    await axios.post("/auth/recover", valuesToSend);
    dispatch(actions.setAlert({
      type: "success",
      msg: "action.remindPassword.success",
      duration: 8000
    }));

  } catch (error) {
    console.log({error})
    dispatch(actions.setAlert({
      type: "danger",
      msg: "action.loginUser.danger",
      duration: 8000
    }))
  }
}