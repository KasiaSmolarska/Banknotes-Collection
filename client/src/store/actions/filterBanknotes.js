import { SET_FILTER_PARAMS, RESET_FILTERING } from "./types";
import actions from "./index";

const filterBanknotes = query => dispatch => {

  const newQuery = Object.entries(query).reduce((filters, elem) => {
    if (typeof elem[1] === "object") {
      const properties = Object.keys(elem[1]).filter(value => elem[1][value]);
      filters[elem[0]] = properties;
    } else if (typeof elem[1] === "string") {
      filters[elem[0]] = elem[1];
    }
    return filters;
  }, {});

  Object.entries(newQuery).map(queryPart => {
    if(!queryPart[1].length){
      delete newQuery[queryPart[0]];
    }
  })

  dispatch({
    type: SET_FILTER_PARAMS,
    payload: newQuery
  });
  dispatch(actions.fetchBanknotes());
};

export const resetFiltering = () => dispatch => {
  dispatch({
    type: RESET_FILTERING
  });
  dispatch(actions.fetchBanknotes());
};

export default filterBanknotes;
