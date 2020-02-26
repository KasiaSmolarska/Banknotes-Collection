import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { BanknotesChart, DefaultChart, getSearchingField } from "./charts/charts";
import { Card } from "./Card";
import PropTypes from "prop-types";

import actions from "../store/actions";

const getBanknote = state => state.banknote;
const getUser = state => state.auth.user;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, banknotesList } = useSelector(getBanknote);

  const user = useSelector(getUser);

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(dispatch(actions.fetchBanknotes()));
    }).then(() => dispatch(actions.fetchBanknoteModel()));
  }, [dispatch]);

  return !loading ? (
    <div className="dashboard">
      <Card mod="banknote" header={banknotesList.length} title="tile.banknoteAdded">
        <BanknotesChart banknotesList={banknotesList} />
      </Card>

      <Card mod="continent" header={`${Object.keys(getSearchingField(banknotesList, "continent")).length} / 7`} title="tile.continentsAdded">
        <DefaultChart banknotesList={banknotesList} value="continent" chartId="continents-chart" seriesName="banknotes" color="#4caf50" />
      </Card>

      <Card mod="country" header={`${Object.keys(getSearchingField(banknotesList, "country")).length} / 317`} title="tile.countriesAdded">
        <DefaultChart banknotesList={banknotesList} value="country" chartId="countries-chart" seriesName="banknotes" color="#F69F43" />
      </Card>

      <Card mod="user" className="card--user" header={`Hello ${user.given_name},`}>
        <img className="card__bg" src="/api/upload/image/14458440-5703-11ea-970c-cd5c3b593a0ddottedBg.png" alt="tile-background" />
        <div className="card__body">
          <span>you have already collected banknotes from: </span>
          <ul className="card__list">
            <li>
              <strong>{((Object.keys(getSearchingField(banknotesList, "continent")).length / 7) * 100).toFixed(1)}%</strong> of all continents,
            </li>
            <li>
              <strong>{((Object.keys(getSearchingField(banknotesList, "country")).length / 317) * 100).toFixed(1)}%</strong> of all countries
            </li>
          </ul>
          <strong>Keep collecting & have fun! </strong>
        </div>
      </Card>
    </div>
  ) : (
    <Spinner />
  );
};

export default Dashboard;

Dashboard.contextTypes = {
  translate: PropTypes.func
};
