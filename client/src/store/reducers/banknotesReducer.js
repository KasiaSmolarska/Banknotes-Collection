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
  CLEAR_BANKNOTE_DATA,
  TOGGLE_IMAGE_MODAL,
  CHANGE_IMAGE_IN_MODAL,
  SET_PAGINATION_LIMIT,
  SET_NUMBER_OF_PRODUCTS,
  SET_PAGINATION_SKIP
} from "../actions/types";

const initialState = {
  model: null,
  banknotesList: [],
  banknote: {},
  showedModalToAddBanknote: false,
  showedModalToEditBanknote: false,
  imageModal: {
    src: "",
    title: "",
    show: false,
    loading: true
  },
  loading: true,
  error: {},
  searchParams: "",
  sortBy: localStorage.getItem("sortBy") || "dateCreated",
  sortDirection: localStorage.getItem("sortDirection") || "DESC",
  limit: localStorage.getItem("limit") || 16,
  skip: 0,
  numberOfProduct: 0
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
    case TOGGLE_IMAGE_MODAL:
      return {
        ...state,
        imageModal: {
          ...state.imageModal,
          src: "",
          title: "",
          show: !state.imageModal.show,
          loading: state.imageModal.show ? true : state.imageModal.loading

        }
      }
    case CHANGE_IMAGE_IN_MODAL:
      return {
        ...state,
        imageModal: {
          ...state.imageModal,
          src: payload.src,
          title: payload.title,
          loading: false
        }
      }
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
    case SET_PAGINATION_LIMIT:
      return {
        ...state,
        limit: payload
      }
    case SET_NUMBER_OF_PRODUCTS:
      return {
        ...state,
        numberOfProduct: payload
      }
    case SET_PAGINATION_SKIP:
      return {
        ...state,
        skip: payload * state.limit
      }
    default:
      return state;
  }
}
