import { FETCH_USER } from "./types";

const fetchUser = () => {
  return async dispatch => {
    const res = await fetch("/api/current_user");
    const data = await res.json();
    dispatch({ type: FETCH_USER, payload: data });
  };
};

export default fetchUser;
