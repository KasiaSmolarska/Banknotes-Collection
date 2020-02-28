import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Search } from "./Search";
import { Spinner } from "./Spinner";
import Translate from "../translate/Translate";

import actions from "../store/actions";

import BanknotesTable from "./BanknotesTable";
import { BanknotesList } from "./BanknotesList";

import { useMedia } from "./hooks/useMedia";

const getBanknote = state => state.banknote;

const sortingRows = ["title", "country", "value", "currency", "issueYear", "dateCreated"];

const BanknotesPage = (props, context) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(dispatch(actions.fetchBanknotes()));
    }).then(() => dispatch(actions.fetchBanknoteModel()));
  }, [dispatch]);

  const media = useMedia();

  const sort = useRef("");

  const { loading, banknotesList, sortBy, sortDirection } = useSelector(getBanknote);

  const changeSorting = sortParams => {
    const [sortBy, sortDirection] = sortParams.split("-");
    dispatch(actions.sortBanknotes(sortBy, sortDirection));
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("sortDirection", sortDirection);
  };

  return !loading ? (
    <div>
      {banknotesList.length > 0 ? (
        <>
          <div className="banknotesListPage__header">
            <Search />
            {media !== "lg" ? (
              <div className="list__header">
                <div className="form__control form__control--sort">
                  <select className="form__select" value={sortBy + "-" + sortDirection} ref={sort} onChange={() => changeSorting(sort.current.value)}>
                    {sortingRows.map(row =>
                      ["ASC", "DESC"].map(direction => (
                        <option key={row + "-" + direction} value={row + "-" + direction}>
                          {context.translate(`sort.${row}.${direction}`)}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="list__result">{banknotesList.length} banknotes</div>
              </div>
            ) : null}
          </div>

          {media === "lg" ? <BanknotesTable /> : <BanknotesList />}
        </>
      ) : (
        <div className="banknotesListPage--noResult">
          <h2>
            <Translate name="page.noBanknotesFound" />
          </h2>
          <div className="my-1">
            <span className="btn btn--blue" onClick={() => dispatch(actions.show_modal_to_add_new_banknote())}>
              <Translate name="button.addNewBanknote" />
            </span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Spinner />
  );
};

BanknotesPage.contextTypes = {
  translate: PropTypes.func
};

export default BanknotesPage;
