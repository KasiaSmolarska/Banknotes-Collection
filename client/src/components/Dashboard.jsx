import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { BanknotesChart, DefaultChart } from "./charts/charts";
import { Card } from "./Card";
import PropTypes from "prop-types";

import actions from "../store/actions";

const getUser = state => state.auth.user;
const getStatistics = state => state.statistics;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { banknote, loading } = useSelector(getStatistics);

  const user = useSelector(getUser);

  React.useEffect(() => {
    dispatch(actions.fetchBanknoteModel());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(actions.fetchBanknoteStatistics());
  }, [dispatch]);

  return !loading ? (
    <div className="dashboard">
      <Card
        mod="banknote"
        header={banknote.dateCreated.reduce((a, b) => {
          return a + b.total;
        }, 0)}
        title="tile.banknoteAdded">
        <BanknotesChart value={banknote.dateCreated} />
      </Card>

      <Card mod="continent" header={`${banknote.continents.length} / 7`} title="tile.continentsAdded">
        <DefaultChart value={banknote.continents} chartId="continents-chart" seriesName="banknotes" color="#4caf50" />
      </Card>

      <Card mod="country" header={`${banknote.countries.length} / 317`} title="tile.countriesAdded">
        <DefaultChart value={banknote.countries} chartId="countries-chart" seriesName="banknotes" color="#F69F43" />
      </Card>

      <Card mod="user" className="card--user" header={`Hello ${user.given_name},`}>
        <img className="card__bg" src="/api/upload/image/14458440-5703-11ea-970c-cd5c3b593a0ddottedBg.png" alt="tile-background" />
        <div className="card__body">
          <span>you have already collected banknotes from: </span>
          <ul className="card__list">
            <li>
              <strong>{((banknote.continents.length / 7) * 100).toFixed(1)}%</strong> of all continents,
            </li>
            <li>
              <strong>{((banknote.countries.length / 317) * 100).toFixed(1)}%</strong> of all countries
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
