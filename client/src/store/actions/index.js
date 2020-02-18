import fetchUser from "./fetchUser";
import logOutUser from "./logOutUser";
import fetchBanknoteModel from "./fetchBanknoteModel";
import postBanknote from "./postBanknote";
import fetchBanknotes from "./fetchBanknotes";
import show_modal_to_add_new_banknote from "./show_modal_to_add_new_banknote";
import searchBanknotes, { resetSearching } from "./searchBanknotes";

const actions = {
  fetchUser,
  logOutUser,
  fetchBanknoteModel,
  postBanknote,
  fetchBanknotes,
  show_modal_to_add_new_banknote,
  searchBanknotes,
  resetSearching
};

export default actions;
