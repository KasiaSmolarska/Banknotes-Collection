import axios from "axios";
import actions from "./index";

export const validatePasswordResetToken = (passwordToken, history) => async dispatch => {
  try {
    const resetTokenIsValid = await axios.get(`/api/auth/reset/${passwordToken}`);
    console.log(resetTokenIsValid.data);
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