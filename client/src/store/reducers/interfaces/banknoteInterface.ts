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
} from "../../actions/types";
import { Continents } from "../../../utils/country-continent";

export type BanknoteType = {
  _user?: string;
  continent?: Continents;
  country?: string;
  own?: boolean;
  currency?: string;
  value?: number;
  pickNumber?: string;
  tbbPickNumber?: string;
  countryPickNumber?: string;
  series?: string;
  issueBank?: string;
  issueYear?: number;
  title: string;
  observe?: string;
  reverse?: string;
  textOnNote?: string;
  userNotes?: string;
  type?: "Paper" | "Polymer";
  width?: number;
  height?: number;
  signatures?: string;
  serialNumber?: string;
  condition?: "UNC" | "-UNC" | "AU" | "XF/EF" | "VF" | "F" | "VG" | "G" | "FAIR" | "P";
  purchaseDate?: Date;
  currencyPaid?: string;
  pricePaid?: number;
  imageFront?: string;
  imageReverse?: string;
  favorite?: boolean;
};

export interface BanknotesState {
  model: null | { [key: string]: { type: string; [key: string]: string } };
  banknotesList: BanknoteType[];
  banknote: BanknoteType;
  showedModalToAddBanknote: boolean;
  showedModalToEditBanknote: boolean;
  imageModal: {
    src: string;
    title: string;
    show: boolean;
    loading: boolean;
  };
  loading: boolean;
  error: any;
  searchParams: string;
  sortBy: string;
  sortDirection: string;
  limit: string | number;
  skip: number;
  numberOfProduct: number;
  filters: { [key: string]: any };
}

export const initialState: BanknotesState = {
  model: null,
  banknotesList: [],
  banknote: { title: "" },
  showedModalToAddBanknote: false,
  showedModalToEditBanknote: false,
  imageModal: {
    src: "",
    title: "",
    show: false,
    loading: true,
  },
  loading: true,
  error: {},
  searchParams: "",
  sortBy: localStorage.getItem("sortBy") || "dateCreated",
  sortDirection: localStorage.getItem("sortDirection") || "DESC",
  limit: localStorage.getItem("limit") || 16,
  skip: 0,
  numberOfProduct: 0,
  filters: {},
};

export interface FetchBanknoteModel {
  type: typeof FETCH_BANKNOTE_MODEL;
  payload: { [key: string]: { type: string; [key: string]: string } };
}

export interface FetchBanknotes {
  type: typeof FETCH_BANKNOTES;
  payload: BanknoteType[];
}

export interface ClearBanknoteData {
  type: typeof CLEAR_BANKNOTE_DATA;
}

export interface ShowModalToEditBanknote {
  type: typeof SHOW_MODAL_TO_EDIT_BANKNOTE;
}

export interface ShowModalToAddBanknote {
  type: typeof SHOW_MODAL_TO_ADD_BANKNOTE;
}

export interface ToggleImageModal {
  type: typeof TOGGLE_IMAGE_MODAL;
}

export interface ChangeImageInModal {
  type: typeof CHANGE_IMAGE_IN_MODAL;
  payload: {
    src: string;
    title: string;
  };
}

export interface SearchBanknotes {
  type: typeof SEARCH_BANKNOTES;
  payload: BanknoteType[];
}

export interface BanknoteError {
  type: typeof BANKNOTE_ERROR;
  payload: any;
}

export interface SetFilterParams {
  type: typeof SET_FILTER_PARAMS;
  payload: { [key: string]: any };
}

export interface SetSearchParams {
  type: typeof SET_SEARCH_PARAMS;
  payload: string;
}

export interface SetSort {
  type: typeof SET_SORT;
  payload: {
    sortBy: string;
    sortDirection: string;
  };
}

export interface FetchBanknoteByID {
  type: typeof FETCH_BANKNOTE_BY_ID;
  payload: BanknoteType;
}

export interface SetPaginationLimit {
  type: typeof SET_PAGINATION_LIMIT;
  payload: number;
}

export interface SetNumberOfProduct {
  type: typeof SET_NUMBER_OF_PRODUCTS;
  payload: number;
}

export interface SetPaginationSkip {
  type: typeof SET_PAGINATION_SKIP;
  payload: number;
}

export interface ResetFiltering {
  type: typeof RESET_FILTERING;
}
