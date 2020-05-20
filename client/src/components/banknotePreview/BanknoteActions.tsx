import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";
import Translate from "../../translate/Translate";
import { HeartIcon } from "../svg/HeartIcon";
import PropTypes from "prop-types";
import useReactRouter from "use-react-router";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

interface BanknoteActionsProps {
  id: string;
  title: string;
  favorite: boolean;
}


export const BanknoteActions = ({ id, title, favorite, ...props }: BanknoteActionsProps, context: TranslateContextTypes) => {
  const { history } = useReactRouter();
  const dispatch = useDispatch();
  const toggleLikes = (id: string) => {
    // @ts-ignore 
    dispatch(actions.toggleBanknotesLike(id)).then(() => dispatch(actions.fetchBanknoteById(id)));
  };

  const openModal = () => {
    dispatch(actions.show_modal_to_edit_banknote());
  };

  const deleteBanknote = (id: string)  => {
    let accept = window.confirm(`Are you sure that you want to delete: ${title}`);

    // @ts-ignore
    accept && dispatch(actions.deleteBanknoteById(id)).then(() => history.push("/dashboard"));
  };
  return (
    <div>
      <div className="btn btn--blue" onClick={() => openModal()}>
        <Translate name="button.edit" />
      </div>

      <div className="btn" onClick={() => toggleLikes(id)}>
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
      <div className="btn btn--danger" onClick={() => deleteBanknote(id)}>
        <Translate name="button.remove" />
      </div>
    </div>
  );
};

BanknoteActions.contextTypes = {
  translate: PropTypes.func
};
