import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Search } from "./Search";
import { Spinner } from "./Spinner";
import { Pagination } from "./Pagination";
import Translate from "../translate/Translate";
import { Icon } from "./Icon";
import actions from "../store/actions";

import BanknotesTable from "./BanknotesTable";
import { BanknotesList } from "./BanknotesList";

import { useMedia } from "./hooks/useMedia";
import { RESET_FILTERING } from "../store/actions/types";

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
  const selectLimit = useRef(null);
  const filterContainer = useRef(null);
  const sortContainer = useRef(null);

  const [menuFilterShow, setMenuFilterShow] = useState(false);
  const [menuSortShow, setMenuSortShow] = useState(false);

  const { loading, banknotesList, sortBy, sortDirection, limit, numberOfProduct, skip, filters, searchParams } = useSelector(getBanknote);

  const handleReset = () => {
    dispatch({
      type: RESET_FILTERING
    });
    dispatch(actions.resetSearching());
  };

  React.useEffect(() => {
    const handleClick = e => {
      if (menuFilterShow && !filterContainer.current.contains(e.target)) {
        setMenuFilterShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [menuFilterShow]);

  React.useEffect(() => {
    const handleClick = e => {
      if (menuSortShow && !sortContainer.current.contains(e.target)) {
        setMenuSortShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [menuSortShow]);

  const changeSorting = sortParams => {
    const [sortBy, sortDirection] = sortParams.split("-");
    dispatch(actions.sortBanknotes(sortBy, sortDirection));
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("sortDirection", sortDirection);
  };

  const setLimit = paginationLimit => {
    dispatch(actions.setPaginationLimit(Number(paginationLimit)));
    localStorage.setItem("limit", Number(paginationLimit));
  };

  return !loading ? (
    <div>
      {banknotesList.length > 0 ? (
        <>
          <div className="banknotesListPage__buttons">
            <div className="banknotesListPage__menu-filter-container" ref={filterContainer}>
              <div className="banknotesListPage__menu-filter-btn btn btn--text" onClick={() => setMenuFilterShow(!menuFilterShow)}>
                <Icon icon="FilterIcon" /> <Translate name="button.filter" />
              </div>

              <div className={`banknotesListPage__menu-filter ${menuFilterShow ? "banknotesListPage__menu-filter--visible" : ""}`}>
                <Search />
                <div className="form__control">
                  <select ref={selectLimit} className="form__select form__select--mini" value={limit} onChange={() => setLimit(selectLimit.current.value)}>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                  </select>
                </div>
              </div>
            </div>
            {media !== "lg" ? (
              <div ref={sortContainer} className="list__header banknotesListPage__menu-sort-container">
                <div className="banknotesListPage__menu-filter-btn btn btn--text" onClick={() => setMenuSortShow(!menuSortShow)}>
                  <Translate name="button.sort" />
                </div>
                <div className={`banknotesListPage__menu-filter ${menuSortShow ? "banknotesListPage__menu-filter--visible" : ""}`}>
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
                </div>
              </div>
            ) : null}
            {searchParams.length ||
              (Object.keys(filters).length ? (
                <div className="banknotesListPage__buttons-reset">
                  <span title={context.translate("button.reset.filters")} onClick={handleReset} className="btn  btn--danger btn--smaller">
                    <Icon icon="CancelIcon" width="12" height="12" fill="#dc3545" /> {context.translate("button.reset")}
                  </span>
                </div>
              ) : null)}
          </div>
          <div>
            <div className="banknotesListPage__pagination">
              {numberOfProduct > limit && <Pagination />}
              <div className="list__result">
                {context.translate("page.baknote.pagination.result", {
                  from: skip + 1,
                  to: banknotesList.length + skip,
                  of: numberOfProduct
                })}
              </div>
            </div>
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
