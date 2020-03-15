import axios from "axios";
import {FETCH_USER} from "./types";
import actions from "./index";

export const loginUser = (values) => async dispatch => {
  try {
    const userData = await axios.post("/auth/login", values);
    dispatch({
      type: FETCH_USER,
      payload: {user: userData.data.user}
    })
  } catch (error) {
    console.log(error)
    dispatch(actions.setAlert({
      type: "danger",
      msg: "action.loginUser.danger",
      duration: 8000
    }))
  }
}