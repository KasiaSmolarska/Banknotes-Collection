import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { BanknotesChart, DefaultChart, DonutChart } from "./charts/charts";
import { Card } from "./Card";
import PropTypes from "prop-types";

import actions from "../store/actions";
import { SET_FILTER_PARAMS } from "../store/actions/types";

const getUser = state => state.auth.user;
const getStatistics = state => state.statistics;

const Dashboard = (props, context) => {
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
        <BanknotesChart charttype="area" value={banknote.dateCreated} />
      </Card>

      <Card mod="continent" header={`${banknote.continents.length} / 7`} title="tile.continentsAdded">
        <DefaultChart charttype="area" value={banknote.continents} chartId="continents-chart" seriesName="banknotes" color="#4caf50" />
      </Card>

      <Card mod="country" header={`${banknote.countries.length} / 317`} title="tile.countriesAdded">
        <DefaultChart charttype="area" value={banknote.countries} chartId="countries-chart" seriesName="banknotes" color="#F69F43" />
      </Card>

      <Card mod="favorite" header={`${banknote.favorites[1] ? banknote.favorites[1].total : 0} / ${banknote.favorites.reduce((start, value) => start + value.total, 0)}`} title="tile.favoritesAdded">
        <div
          className="btn btn--primary card-favorite-button"
          onClick={() => {
            // dispatch(actions.filterBanknotes({ favorite: true }));
            dispatch({
              type: SET_FILTER_PARAMS,
              payload: { favorite: true }
            });
            props.history.push("/banknotes");
          }}>
          See all favorites
        </div>
        <DonutChart charttype="pie" value={banknote.favorites} chartId="favorites-chart" colors={["#F9B4C4", "#7a18e3"]} />
      </Card>

      <Card mod="user" className="card--user" header={context.translate("tile.summary.tile", { name: user.given_name })}>
        <img className="card__bg" src="/api/upload/image/14458440-5703-11ea-970c-cd5c3b593a0ddottedBg.png" alt="tile-background" />
        <div className="card__body">
          <span>{context.translate("tile.summary.subtitle")} </span>
          <ul className="card__list">
            <li>
              <strong>{((banknote.continents.length / 7) * 100).toFixed(1)}%</strong> {context.translate("tile.summary.point1")}
            </li>
            <li>
              <strong>{((banknote.countries.length / 317) * 100).toFixed(1)}%</strong> {context.translate("tile.summary.point2")}
            </li>
          </ul>
          <strong>{context.translate("tile.summary.bottom")} </strong>
        </div>
      </Card>

      <Card mod="issueYear" header={`${banknote.issueYears[banknote.issueYears.length -1]._id} - ${banknote.issueYears[0]._id}`} title="tile.issueYearAdded">
        <DefaultChart charttype="area" value={banknote.issueYears} chartId="issueYear-chart" seriesName="issueYear" color="#F69F43" />
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
