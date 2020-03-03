import React from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";
import PropTypes from "prop-types";

const getUser = state => state.auth.user;

export const ProfilePage = (props, context) => {
  const { familyName, given_name, picture } = useSelector(getUser);
  const dispatch = useDispatch();
  return (
    <div className="profile">
      <img className="profile__image my-1" src={picture} alt={familyName} />

      <div className="profile__heading my-2">
        {given_name} {familyName}
      </div>
      <div>
        <span
          className="btn btn--danger"
          onClick={() => {
            const accept = window.confirm(context.translate("prompt.deleteProfile"));

            accept && dispatch(actions.deleteUser());
          }}>
          {context.translate("button.deleteProfile")}
        </span>
      </div>
    </div>
  );
};

ProfilePage.contextTypes = {
  translate: PropTypes.func
};
