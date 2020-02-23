import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { BanknotesChart } from "./charts/charts";
import Translate from "../translate/Translate";
import PropTypes from "prop-types";

import actions from "../store/actions";

const getBanknote = state => state.banknote;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, banknotesList } = useSelector(getBanknote);

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
  }, []);

  return !loading ? (
    <div className="dashboard">
      <div className="card-container">
        <div className="card">
          <div className="card__top">
            <div className="truncate">
              <h2>{banknotesList.length}</h2>
              <div className="card__title">
                <Translate name="tile.banknoteAdded" />
              </div>
            </div>
          </div>
          <BanknotesChart banknotesList={banknotesList} />
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <div className="card__top">
            <div className="truncate">
              <h2>{banknotesList.length}</h2>
              <div className="card__title">
                <Translate name="tile.banknoteAdded" />
              </div>
            </div>
          </div>
          <BanknotesChart banknotesList={banknotesList} />
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <div className="card__top">
            <div className="truncate">
              <h2>{banknotesList.length}</h2>
              <div className="card__title">
                <Translate name="tile.banknoteAdded" />
              </div>
            </div>
          </div>
          <BanknotesChart banknotesList={banknotesList} />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Dashboard;

Dashboard.contextTypes = {
  translate: PropTypes.func
};
