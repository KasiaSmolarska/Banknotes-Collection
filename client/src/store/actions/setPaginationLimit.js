import actions from "./index";
import { SET_PAGINATION_LIMIT } from "./types"

const setPaginationLimit = (limit) => (dispatch) => {
  dispatch({
    type: SET_PAGINATION_LIMIT,
    payload: limit
  })

  dispatch(actions.fetchBanknotes());
}

export default setPaginationLimit;