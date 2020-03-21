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
    console.log({error})
    if (error.response.status === 409) {
      return dispatch(actions.setAlert({
        type: "info",
        msg: "action.loginUser.info",
        duration: 8000
      }))
    }
    dispatch(actions.setAlert({
      type: "danger",
      msg: "action.loginUser.danger",
      duration: 8000
    }))
  }
}