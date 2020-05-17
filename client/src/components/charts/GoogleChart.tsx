import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { SET_FILTER_PARAMS } from "../../store/actions/types";
import { Chart } from "react-google-charts";
import { getCountryName, CountriesKeys } from "../../utils/countriesCodes";
import useReactRouter from "use-react-router";
import { change } from "redux-form";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

interface CountryStatTypes {
  _id: CountriesKeys;
  total: number;
}

interface GoogleChartPropsTypes {
  value: CountryStatTypes[];
}

export const GoogleChart = ({ value }: GoogleChartPropsTypes, context: TranslateContextTypes) => {
  const { history } = useReactRouter();
  const dispatch = useDispatch();

  let mappedData = [
    ["Country", "Banknotes", { role: "tooltip", type: "string", p: { html: true } }],
    ...value.map((obj) => [obj._id, obj.total, `<strong class="chart--maps-bold">${getCountryName(obj._id)} - ${obj.total} ${context.translate("chart.maps.banknotes")}</strong>`]),
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "0px", paddingBottom: "40%" }}>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) {
                  return;
                }
                // @ts-ignore
                const region = getCountryName(mappedData[selection[0].row + 1][0]);
                const decision = window.confirm(`Chcesz zobaczyć banknoty dla ${region}`);
                if (decision) {
                  const countryCode = [mappedData[selection[0].row + 1][0]];
                  dispatch({
                    type: SET_FILTER_PARAMS,
                    payload: { country: countryCode },
                  });
                  // @ts-ignore

                  dispatch(change("filtersForm", "country", { [countryCode]: true }, true));
                  history.push("/banknotes");
                }
              },
            },
          ]}
          chartType="GeoChart"
          width="100%"
          height="100%"
          data={mappedData}
          options={{
            // This must be also set to render the tooltip with html (vs svg)
            tooltip: { isHtml: true, trigger: "visible" },
            colorAxis: { colors: ["#a4d6a6", "#007505"] },
            backgroundColor: "#9cd5dc",
            datalessRegionColor: "#ffffff",
            defaultColor: "#f5f5f5",
            explorer: { actions: ["dragToZoom", "rightClickToReset"] },
          }}
        />
      </div>
    </div>
  );
};

GoogleChart.contextTypes = {
  translate: PropTypes.func,
};
