import { FETCH_USER, LOG_OUT_USER } from "../actions/types";

export default function(state = null, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCH_USER:
      return payload.user ? payload : false;
    case LOG_OUT_USER:
      return false;
    default:
      return state;
  }
}
