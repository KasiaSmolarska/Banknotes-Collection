import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import actions from "../store/actions/index";
import Translate from "../translate/Translate";
import { ReactComponent as SearchIcon } from "./svg/search.svg";
import { CancelIcon } from "./svg/CancelIcon";

export const Search = (props, context) => {
  const [query, setQuery] = useState("");
  const handleChange = e => {
    setQuery(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(query);
    dispatch(actions.searchBanknotes(query));
  };
  return (
    <form className="form form--search" onSubmit={handleSubmit}>
      <div className="form__control form__control--flex">
        <input name="search" className="form__input" placeholder={context.translate("input.searchPlaceholder")} onChange={handleChange} type="search" />
        <label htmlFor="search" className="form__label form__label--flex">
          <Translate name="input.searchPlaceholder" />
        </label>
        <button type="submit" title={context.translate("input.searchPlaceholder")} className="btn btn--round btn--primary">
          <SearchIcon />
        </button>
        <button type="reset" title={context.translate("button.reset")} onClick={() => dispatch(actions.resetSearching())} className="btn btn--danger btn--round">
          <CancelIcon fill="#fff" />
        </button>
      </div>
    </form>
  );
};

Search.contextTypes = {
  translate: PropTypes.func
};
