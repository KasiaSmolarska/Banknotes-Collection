import actions from './index';

const copyBanknote = id => (dispatch, getState) => {
  dispatch(actions.fetchBanknoteById(id))
    .then(() => {
      const { banknote } = getState().banknote;
      const newBanknote = { ...banknote, title: `Copy ${banknote.title}` };
      delete newBanknote._id;
      delete newBanknote.dateCreated;
      return dispatch(actions.postBanknote(newBanknote))
    }).then(() => dispatch(actions.clearBanknoteData()));
}

export default copyBanknote;