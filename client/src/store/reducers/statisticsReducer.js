import { FETCH_BANKNOTE_STATISTICS } from "../actions/types";

const initialState = {
  banknote: {},
  loading: true
}

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCH_BANKNOTE_STATISTICS:
      return {
        ...state,
        banknote: payload,
        loading: false
      }

    default:
      return state;
  }
}