import { SET_PAGINATION_SKIP } from "./types";
import actions from "./index"

const setPaginationSkip = paginationSkip => dispatch => {

  dispatch(actions.fetchBanknotes(paginationSkip));
}

export default setPaginationSkip;