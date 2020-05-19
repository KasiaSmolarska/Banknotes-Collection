import { LOG_OUT_USER } from "./types";
import { AppThunk } from ".";

const logOutUser = (): AppThunk => {
  return async (dispatch) => {
    const res = await fetch("/api/logout");
    const data = await res.json();
    dispatch({ type: LOG_OUT_USER, payload: data });
  };
};

export default logOutUser;
