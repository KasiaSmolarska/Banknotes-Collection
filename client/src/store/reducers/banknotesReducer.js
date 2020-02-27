import {
  FETCH_BANKNOTE_MODEL,
  FETCH_BANKNOTES,
  SHOW_MODAL_TO_ADD_BANKNOTE,
  SEARCH_BANKNOTES,
  BANKNOTE_ERROR,
  SHOW_MODAL_TO_EDIT_BANKNOTE,
  SET_SEARCH_PARAMS,
  SET_SORT,
  FETCH_BANKNOTE_BY_ID,
  CLEAR_BANKNOTE_DATA
} from "../actions/types";

const initialState = {
  model: null,
  banknotesList: [],
  banknote: {},
  showedModalToAddBanknote: false,
  showedModalToEditBanknote: false,
  loading: true,
  error: {},
  searchParams: "",
  sortBy: localStorage.getItem("sortBy") || "dateCreated",
  sortDirection: localStorage.getItem("sortDirection") || "DESC"
};

export default function (state = initialState, action) {
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
        banknotesList: payload.map(banknote => {
          return {
            ...banknote,
            imageFront: banknote.imageFront ? banknote.imageFront : "no-photo.jpg",
            imageReverse: banknote.imageReverse ? banknote.imageReverse : "no-photo.jpg"
          };
        }),
        loading: false
      };
    case CLEAR_BANKNOTE_DATA:
      return {
        ...state,
        banknote: {}
      };
    case SHOW_MODAL_TO_EDIT_BANKNOTE:
      return {
        ...state,
        showedModalToEditBanknote: !state.showedModalToEditBanknote,
        showedModalToAddBanknote: false,
        loading: false
      };
    case SHOW_MODAL_TO_ADD_BANKNOTE:
      return {
        ...state,
        showedModalToAddBanknote: !state.showedModalToAddBanknote,
        showedModalToEditBanknote: false,
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
        error: payload
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
    case FETCH_BANKNOTE_BY_ID:
      return {
        ...state,
        loading: false,
        banknote: { ...payload }
      };
    default:
      return state;
  }
}
