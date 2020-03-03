import { FETCH_USER, LOG_OUT_USER, DELETE_ACCOUNT } from "../actions/types";

const initial_state = {
  user: null,
  loading: true
};

export default function(state = initial_state, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: payload.user ? payload.user : false,
        loading: false
      };
    case DELETE_ACCOUNT:
    case LOG_OUT_USER:
      return {
        ...state,
        user: false,
        loading: false
      };
    default:
      return state;
  }
}
