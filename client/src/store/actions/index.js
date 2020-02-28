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
  copyBanknote
};

export default actions;
