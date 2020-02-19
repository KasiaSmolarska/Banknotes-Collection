import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";
import Translate from "../../translate/Translate";
import { HeartIcon } from "../svg/HeartIcon";
import { Dropdown } from "../dropdown/Dropdown";

import PropTypes from "prop-types";

export const ListActions = ({ id, favorite }, context) => {
  const dispatch = useDispatch();
  const toggleLikes = id => {
    dispatch(actions.toggleBanknotesLike(id));
  };
  return (
    <Dropdown icon="AlertIcon">
      <div className="listActions__remove">Remove</div>
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
      <div className="listActions__edit">Edit</div>
    </Dropdown>
  );
};

ListActions.contextTypes = {
  translate: PropTypes.func
};
