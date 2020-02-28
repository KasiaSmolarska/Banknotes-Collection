import { SET_PAGINATION_SKIP } from "./types";
import actions from "./index"

const setPaginationSkip = paginationSkip => dispatch => {
  console.log(paginationSkip)


  dispatch(actions.fetchBanknotes(paginationSkip));
}

export default setPaginationSkip;