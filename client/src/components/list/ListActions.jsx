import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";
import Translate from "../../translate/Translate";
import { HeartIcon } from "../svg/HeartIcon";
import PropTypes from "prop-types";
import { Icon } from "../Icon";

// import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";

import Dropdown from "../dropdown/Dropdown";

export const ListActions = ({ id, favorite, title, classList }, context) => {
  const dispatch = useDispatch();
  const toggleLikes = id => {
    dispatch(actions.toggleBanknotesLike(id));
  };

  const openModal = id => {
    dispatch(actions.fetchBanknoteById(id)).then(() => dispatch(actions.show_modal_to_edit_banknote()));
  };

  const copyBanknote = id => {
    dispatch(actions.copyBanknote(id));
  };

  const deleteBanknote = id => {
    let accept = window.confirm(`Are you sure that you want to delete: ${title}`);

    accept && dispatch(actions.deleteBanknoteById(id));
  };

  const DropdownContent = (
    <div>
      <div className="dropdown__item listActions__edit" onClick={() => openModal(id)}>
        <Translate name="button.edit" />
      </div>
      <div className="dropdown__item listActions__copy" onClick={() => copyBanknote(id)}>
        <Translate name="button.copy" />
      </div>

      <div className="dropdown__item listActions__favorite" onClick={() => toggleLikes(id)}>
        {favorite ? (
          <span className="listActions__favorite-elem" title={context.translate("action.removeFromFavorites")}>
            <HeartIcon height="22" width="22" />
          </span>
        ) : (
          <span className="listActions__favorite-elem" title={context.translate("action.addToFavorites")}>
            <HeartIcon height="22" width="22" fill="#cacaca" />
          </span>
        )}
      </div>

      <div className="dropdown__item listActions__remove" onClick={() => deleteBanknote(id)}>
        <Translate name="button.remove" />
      </div>
    </div>
  );

  return (
    <>
      <Dropdown tooltip={DropdownContent}>
        <Icon icon="MenuIcon" />
      </Dropdown>
    </>
  );
};

ListActions.contextTypes = {
  translate: PropTypes.func
};
