import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { BanknotesChart, DefaultChart, getSearchingField } from "./charts/charts";
import Translate from "../translate/Translate";
import PropTypes, { object } from "prop-types";

import actions from "../store/actions";

const getBanknote = state => state.banknote;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, banknotesList } = useSelector(getBanknote);

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
    dispatch(actions.fetchBanknoteModel());
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
              <h2>{Object.keys(getSearchingField(banknotesList, "continent")).length} / 7</h2>
              <div className="card__title">
                <Translate name="tile.continentsAdded" />
              </div>
            </div>
          </div>
          <DefaultChart banknotesList={banknotesList} value="continent" chartId="continents-chart" seriesName="banknotes" color="blue" />
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <div className="card__top">
            <div className="truncate">
              <h2>{Object.keys(getSearchingField(banknotesList, "country")).length} / 317</h2>
              <div className="card__title">
                <Translate name="tile.countriesAdded" />
              </div>
            </div>
          </div>
          <DefaultChart banknotesList={banknotesList} value="country" chartId="countries-chart" seriesName="banknotes" color="red" />
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
