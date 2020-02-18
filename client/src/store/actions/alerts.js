import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuidv1 from "uuid/v1";

export const setAlert = ({ msg, type, duration }) => dispatch => {
  const id = uuidv1();
  setTimeout(() => dispatch(removeAlert(id)), duration || 2000);

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      type
    }
  });
};

export const removeAlert = id => {
  return {
    type: REMOVE_ALERT,
    payload: id
  };
};
