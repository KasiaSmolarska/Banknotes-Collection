import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "./Search";
import { Spinner } from "./Spinner";

import actions from "../store/actions";
import BanknoteForm from "./banknoteForm/BanknoteForm";
import BanknotesList from "./BanknotesList";
import EditForm from "./banknoteForm/EditForm";

import { useMedia } from "./hooks/useMedia";

const getBanknote = state => state.banknote;

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchBanknoteModel());
  }, []);

  const media = useMedia();

  const { showedModalToAddBanknote, showedModalToEditBanknote, loading, banknote } = useSelector(getBanknote);

  return !loading ? (
    <div>
      <Search />
      {media == "lg" && <BanknotesList />}
      {showedModalToEditBanknote && <EditForm initialValues={banknote} />}

      {showedModalToAddBanknote && <BanknoteForm />}
    </div>
  ) : (
    <Spinner />
  );
};

export default Dashboard;
