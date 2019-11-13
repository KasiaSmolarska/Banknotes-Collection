import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  const { payload } = action;

  switch (action.type) {
    case FETCH_USER:
      return payload ? payload : false;
    default:
      return state;
  }
}
