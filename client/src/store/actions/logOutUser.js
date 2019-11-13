import { LOG_OUT_USER } from "./types";

const logOutUser = () => {
  return async dispatch => {
    const res = await fetch("/api/logout");
    console.log(res);
    const data = await res.json();
    dispatch({ type: LOG_OUT_USER, payload: data });
  };
};

export default logOutUser;
