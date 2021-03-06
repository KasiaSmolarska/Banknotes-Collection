import fetchUser from "./fetchUser";
import logOutUser from "./logOutUser";
import fetchBanknoteModel from "./fetchBanknoteModel";
import postBanknote from "./postBanknote";
import fetchBanknotes from "./fetchBanknotes";
import show_modal_to_add_new_banknote from "./show_modal_to_add_new_banknote";
import searchBanknotes, { resetSearching } from "./searchBanknotes";
import { setAlert, removeAlert } from "./alerts";
import { sortBanknotes } from "./sortBanknotes";
import toggleBanknotesLike from "./toggleBanknotesLike";
import fetchBanknoteById from "./fetchBanknoteById";
import show_modal_to_edit_banknote from "./show_modal_to_edit_banknote";
import updateBanknote from "./updateBanknote";
import deleteBanknoteById from "./deleteBanknoteById";
import clearBanknoteData from "./clearBanknoteData";
import { changeImageInModal } from "./changeImageInModal";
import { toggleImageModal } from "./toggleImageModal";
import copyBanknote from "./copyBanknote";
import setPaginationLimit from "./setPaginationLimit";
import setPaginationSkip from "./setPaginationSkip";
import fetchBanknoteStatistics from "./fetchBanknoteStatistics";
import deleteUser from "./deleteUser";
import filterBanknotes from "./filterBanknotes";
import { resetFiltering } from "./filterBanknotes";
import {loginUser} from "./loginUser";
import {registerUser} from "./registerUser";
import {remindPassword} from "./remindPassword";
import {validatePasswordResetToken} from "./validatePasswordResetToken";
import {resetPassword} from "./resetPassword";
import {confirmAccount} from "./confirmAccount";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../index";
import { Action } from "redux";

const actions = {
  fetchUser,
  logOutUser,
  fetchBanknoteModel,
  postBanknote,
  fetchBanknotes,
  show_modal_to_add_new_banknote,
  searchBanknotes,
  resetSearching,
  setAlert,
  removeAlert,
  sortBanknotes,
  toggleBanknotesLike,
  fetchBanknoteById,
  show_modal_to_edit_banknote,
  updateBanknote,
  deleteBanknoteById,
  clearBanknoteData,
  changeImageInModal,
  toggleImageModal,
  copyBanknote,
  setPaginationLimit,
  setPaginationSkip,
  fetchBanknoteStatistics,
  deleteUser,
  filterBanknotes,
  resetFiltering,
  loginUser,
  registerUser,
  remindPassword,
  validatePasswordResetToken,
  resetPassword,
  confirmAccount
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type AppDispatch = ThunkDispatch<RootState, unknown,  Action<string>>;

export default actions;
