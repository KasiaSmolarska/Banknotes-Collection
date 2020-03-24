import axios from "axios";
import actions from "./index";

export const validatePasswordResetToken = (passwordToken, history) => async dispatch => {
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
