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

    const userData = await axios.post("/auth/login", { email: values.email, password: values.password})
    dispatch({
      type: FETCH_USER,
      payload: {user: userData.data.user}
    })
    dispatch(actions.setAlert({
      type: "success",
      msg: "action.registerUser.success",
      duration: 5000
    }))
  } catch (error) {
    console.log(error)
    dispatch(actions.setAlert({
      type: "danger",
      msg: "action.registerUser.danger",
      duration: 8000
    }))
  }
}