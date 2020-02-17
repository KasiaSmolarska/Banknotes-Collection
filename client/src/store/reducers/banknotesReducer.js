import { FETCH_BANKNOTE_MODEL, FETCH_BANKNOTES, SHOW_MODAL_TO_ADD_BANKNOTE } from "../actions/types";

const initialState = {
  model: null,
  banknotesList: [],
  showedModalToAddBanknote: false,
  loading: true
};

export default function(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCH_BANKNOTE_MODEL:
      return {
        ...state,
        model: payload,
        loading: false
      };
    case FETCH_BANKNOTES:
      return {
        ...state,
        banknotesList: payload,
        loading: false
      };
    case SHOW_MODAL_TO_ADD_BANKNOTE:
      return {
        ...state,
        showedModalToAddBanknote: !state.showedModalToAddBanknote,
        loading: false
      };
    default:
      return state;
  }
}
