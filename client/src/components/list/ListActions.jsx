import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";
import Translate from "../../translate/Translate";
import { HeartIcon } from "../svg/HeartIcon";
import { Dropdown } from "../dropdown/Dropdown";

import PropTypes from "prop-types";

export const ListActions = ({ id, favorite, title, classList }, context) => {
  const dispatch = useDispatch();
  const toggleLikes = id => {
    dispatch(actions.toggleBanknotesLike(id));
  };

  const openModal = id => {
    dispatch(actions.fetchBanknoteById(id)).then(() => dispatch(actions.show_modal_to_edit_banknote()));
  };

  const deleteBanknote = id => {
    let accept = window.confirm(`Are you sure that you want to delete: ${title}`);

    accept && dispatch(actions.deleteBanknoteById(id));
  };

  return (
    <>
      <Dropdown icon="MenuIcon" classList={classList}>
        <div className="listActions__remove" onClick={() => deleteBanknote(id)}>
          <Translate name="button.remove" />
        </div>
        <div className="listActions__favorite" onClick={() => toggleLikes(id)}>
          {favorite ? (
            <span className="listActions__favorite-elem" title={context.translate("action.removeFromFavorites")}>
              <HeartIcon height="25" width="25" />
            </span>
          ) : (
            <span className="listActions__favorite-elem" title={context.translate("action.addToFavorites")}>
              <HeartIcon height="25" width="25" fill="#cacaca" />
            </span>
          )}
        </div>
        <div className="listActions__edit" onClick={() => openModal(id)}>
          <Translate name="button.edit" />
        </div>
      </Dropdown>
    </>
  );
};

ListActions.contextTypes = {
  translate: PropTypes.func
};
