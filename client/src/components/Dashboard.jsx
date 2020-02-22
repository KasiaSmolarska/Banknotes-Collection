import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";

import actions from "../store/actions";

const getBanknote = state => state.banknote;

const Dashboard = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
  }, [dispatch]);

  const { loading } = useSelector(getBanknote);

  return !loading ? <div>Dashboard</div> : <Spinner />;
};

export default Dashboard;
