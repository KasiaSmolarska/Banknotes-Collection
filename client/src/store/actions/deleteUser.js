import axios from "axios";
import actions from "./index";
import { DELETE_ACCOUNT } from "./types";

const deleteUser = () => async dispatch => {
  try {
    await axios.delete("/api/profile");
    dispatch({
      type: DELETE_ACCOUNT
    });
    dispatch(
      actions.setAlert({
        type: "info",
        msg: "action.deleteUser.info",
        duration: 7000
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      actions.setAlert({
        type: "danger",
        msg: "action.deleteUser.danger",
        duration: 6000
      })
    );
  }
};

export default deleteUser;
