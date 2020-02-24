import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { BanknotesChart, DefaultChart, getSearchingField } from "./charts/charts";
import { Card } from "./Card";
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
      <Card header={banknotesList.length} title="tile.banknoteAdded">
        <BanknotesChart banknotesList={banknotesList} />
      </Card>

      <Card header={`${Object.keys(getSearchingField(banknotesList, "continent")).length} / 7`} title="tile.continentsAdded">
        <DefaultChart banknotesList={banknotesList} value="continent" chartId="continents-chart" seriesName="banknotes" color="#4caf50" />
      </Card>

      <Card header={`${Object.keys(getSearchingField(banknotesList, "country")).length} / 317`} title="tile.countriesAdded">
        <DefaultChart banknotesList={banknotesList} value="country" chartId="countries-chart" seriesName="banknotes" color="#F69F43" />
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
