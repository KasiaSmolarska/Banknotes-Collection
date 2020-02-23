import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { BanknotesChart } from "./charts/charts";

import actions from "../store/actions";

const getBanknote = state => state.banknote;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, banknotesList } = useSelector(getBanknote);

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
  }, []);

  return !loading ? (
    <div className="card">
      <div className="card__top">
        <div className="truncate">
          <h2>{banknotesList.length}</h2>
          <div className="card__title">dodanych banknotów</div>
        </div>
      </div>
      <BanknotesChart banknotesList={banknotesList} />
    </div>
  ) : (
    <Spinner />
  );
};

export default Dashboard;
