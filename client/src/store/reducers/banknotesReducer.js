import { FETCH_BANKNOTE_MODEL, FETCH_BANKNOTES, SHOW_MODAL_TO_ADD_BANKNOTE, SEARCH_BANKNOTES, BANKNOTE_ERROR, SET_SEARCH_PARAMS, SET_SORT } from "../actions/types";

const initialState = {
  model: null,
  banknotesList: [],
  showedModalToAddBanknote: false,
  loading: true,
  error: {},
  searchParams: "",
  sortBy: "title",
  sortDirection: "ASC"
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
    case SEARCH_BANKNOTES:
      return {
        ...state,
        banknotesList: payload,
        loading: false
      };
    case BANKNOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: payload
      };
    case SET_SORT:
      return {
        ...state,
        sortBy: payload.sortBy,
        sortDirection: payload.sortDirection
      };
    default:
      return state;
  }
}
