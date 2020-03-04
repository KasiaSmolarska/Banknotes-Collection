import { FETCH_USER } from "./types";
import actions from "./index";

const fetchUser = () => {
  return async dispatch => {
    try {
      const res = await fetch("/api/current_user");
      const data = await res.json();
      console.log(data);
      if (!data.user.active) {
        dispatch({ type: FETCH_USER, payload: false });
        return dispatch(
          actions.setAlert({
            type: "danger",
            msg: "action.fetchUser.danger",
            duration: 9000
          })
        );
      }
      dispatch({ type: FETCH_USER, payload: data });
    } catch (error) {}
  };
};

export default fetchUser;
