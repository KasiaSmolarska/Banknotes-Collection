import axios from "axios";
import {FETCH_USER} from "./types";
import actions from "./index";

export const registerUser = (values) => async dispatch => {
  try {

    if(!values.password || !values.password2 || !values.email || !values.givenName){
      return dispatch(actions.setAlert({
        type: "danger",
        msg: "action.registerUser.field.danger",
        duration: 8000
      }))
    }
    if(values.password !== values.password2){
      return dispatch(actions.setAlert({
        type: "danger",
        msg: "action.registerUser.password.danger",
        duration: 8000
      }))
    }
    await axios.post("/auth/register", values);
    dispatch(actions.confirmAccount(values.email));

    dispatch(actions.setAlert({
      type: "info",
      msg: "action.registerUser.info",
      duration: 5000
    }))
  } catch (error) {
    if (error.response.status === 422) {
      return dispatch(actions.setAlert({
        type: "danger",
        msg: "action.registerUser.email.danger",
        duration: 8000
      }))
    }
    dispatch(actions.setAlert({
      type: "danger",
      msg: "action.registerUser.danger",
      duration: 8000
    }))
  }
}