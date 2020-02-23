import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "./Search";
import { Spinner } from "./Spinner";
import Translate from "../translate/Translate";

import actions from "../store/actions";

import BanknotesTable from "./BanknotesTable";
import { BanknotesList } from "./BanknotesList";

import { useMedia } from "./hooks/useMedia";

const getBanknote = state => state.banknote;

const BanknotesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchBanknoteModel());
  }, []);

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
  }, [dispatch]);

  const media = useMedia();

  const { loading, banknotesList } = useSelector(getBanknote);

  return !loading ? (
    <div>
      {banknotesList.length > 0 ? (
        <>
          <Search /> {media == "lg" ? <BanknotesTable /> : <BanknotesList />}{" "}
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

export default BanknotesPage;
