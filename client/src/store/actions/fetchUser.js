import { FETCH_USER } from "./types";

const fetchUser = () => {
  return async dispatch => {
    try {
      const res = await fetch("/api/current_user");
      const data = await res.json();

      dispatch({ type: FETCH_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export default fetchUser;
