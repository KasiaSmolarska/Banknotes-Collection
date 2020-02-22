import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "./Search";
import { Spinner } from "./Spinner";

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

  const { loading } = useSelector(getBanknote);

  return !loading ? (
    <div>
      {console.log(media)}
      <Search />
      {media == "lg" ? <BanknotesTable /> : <BanknotesList />}
    </div>
  ) : (
    <Spinner />
  );
};

export default BanknotesPage;
