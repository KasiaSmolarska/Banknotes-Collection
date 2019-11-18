import { FETCH_BANKNOTE_MODEL } from "../actions/types";

const initialState = {
  model: null
};

export default function(state = initialState, action) {
  const { payload } = action;
  console.log("payload", payload);
  switch (action.type) {
    case FETCH_BANKNOTE_MODEL:
      return {
        ...state,
        model: payload
      };
    default:
      return state;
  }
}
