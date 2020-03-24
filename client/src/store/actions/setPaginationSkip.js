import actions from "./index"

const setPaginationSkip = paginationSkip => dispatch => {

  dispatch(actions.fetchBanknotes(paginationSkip));
}

export default setPaginationSkip;