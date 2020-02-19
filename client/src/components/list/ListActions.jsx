import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";
import Translate from "../../translate/Translate";

export const ListActions = ({ id, favorite }) => {
  const dispatch = useDispatch();
  const toggleLikes = id => {
    dispatch(actions.toggleBanknotesLike(id));
  };
  return (
    <div>
      <div className="listActions__remove">Remove</div>
      <div className="listActions__favorite" onClick={() => toggleLikes(id)}>
        {favorite ? <Translate name="action.addToFavorites" /> : <Translate name="actions.removeFromFavorites" />}
      </div>
      <div className="listActions__edit">Edit</div>
    </div>
  );
};
