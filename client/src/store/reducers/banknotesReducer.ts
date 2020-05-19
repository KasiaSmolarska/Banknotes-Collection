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
  SET_PAGINATION_SKIP,
  SET_FILTER_PARAMS,
  RESET_FILTERING,
} from "../actions/types";

import {
  FetchBanknoteModel,
  FetchBanknotes,
  ClearBanknoteData,
  ShowModalToEditBanknote,
  ShowModalToAddBanknote,
  ToggleImageModal,
  ChangeImageInModal,
  SearchBanknotes,
  BanknoteError,
  SetFilterParams,
  SetSearchParams,
  SetSort,
  FetchBanknoteByID,
  SetPaginationLimit,
  SetNumberOfProduct,
  SetPaginationSkip,
  ResetFiltering,
  initialState,
  BanknotesState,
  BanknoteType,
} from "./interfaces/banknoteInterface";

export type BanknotesActionTypes =
  | FetchBanknoteModel
  | FetchBanknotes
  | ClearBanknoteData
  | ShowModalToEditBanknote
  | ShowModalToAddBanknote
  | ToggleImageModal
  | ChangeImageInModal
  | SearchBanknotes
  | BanknoteError
  | SetFilterParams
  | SetSearchParams
  | SetSort
  | FetchBanknoteByID
  | SetPaginationLimit
  | SetNumberOfProduct
  | SetPaginationSkip
  | ResetFiltering;

export default function (state = initialState, action: BanknotesActionTypes): BanknotesState {
  switch (action.type) {
    case FETCH_BANKNOTE_MODEL:
      return {
        ...state,
        model: action.payload,
      };
    case FETCH_BANKNOTES:
      return {
        ...state,
        banknotesList: action.payload.map((banknote: BanknoteType) => {
          return {
            ...banknote,
            imageFront: banknote.imageFront ? banknote.imageFront : "no-photo.jpg",
            imageReverse: banknote.imageReverse ? banknote.imageReverse : "no-photo.jpg",
          };
        }),
        loading: false,
      };
    case CLEAR_BANKNOTE_DATA:
      return {
        ...state,
        banknote: { title: "" },
      };
    case SHOW_MODAL_TO_EDIT_BANKNOTE:
      return {
        ...state,
        showedModalToEditBanknote: !state.showedModalToEditBanknote,
        showedModalToAddBanknote: false,
        loading: false,
      };
    case SHOW_MODAL_TO_ADD_BANKNOTE:
      return {
        ...state,
        showedModalToAddBanknote: !state.showedModalToAddBanknote,
        showedModalToEditBanknote: false,
        loading: false,
      };
    case TOGGLE_IMAGE_MODAL:
      return {
        ...state,
        imageModal: {
          ...state.imageModal,
          src: "",
          title: "",
          show: !state.imageModal.show,
          loading: state.imageModal.show ? true : state.imageModal.loading,
        },
      };
    case CHANGE_IMAGE_IN_MODAL:
      return {
        ...state,
        imageModal: {
          ...state.imageModal,
          src: action.payload.src,
          title: action.payload.title,
          loading: false,
        },
      };
    case SEARCH_BANKNOTES:
      return {
        ...state,
        banknotesList: action.payload,
        loading: false,
      };
    case BANKNOTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_FILTER_PARAMS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: action.payload,
      };
    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      };
    case FETCH_BANKNOTE_BY_ID:
      return {
        ...state,
        loading: false,
        banknote: { ...action.payload },
      };
    case SET_PAGINATION_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };
    case SET_NUMBER_OF_PRODUCTS:
      return {
        ...state,
        numberOfProduct: action.payload,
      };
    case SET_PAGINATION_SKIP:
      return {
        ...state,
        skip: action.payload * parseInt(state.limit as string),
      };
    case RESET_FILTERING:
      return {
        ...state,
        filters: {},
      };
    default:
      return state;
  }
}
