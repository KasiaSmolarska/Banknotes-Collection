import { FETCH_BANKNOTE_MODEL, FETCH_BANKNOTES } from "../actions/types";

const initialState = {
  model: null,
  banknotesList: []
};

export default function(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCH_BANKNOTE_MODEL:
      return {
        ...state,
        model: payload
      };
    case FETCH_BANKNOTES:
      return {
        ...state,
        banknotesList: payload
      };
    default:
      return state;
  }
}
