import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import { getCountryName } from "../../utils/countriesCodes";

export const GoogleChart = ({ value }, context) => {
  console.log(value);
  let mappedData = value.reduce((arr, obj) => {
    arr.push([
      obj._id,
      obj.total,
      `<strong class="chart--maps-bold">${getCountryName(obj._id)} - ${obj.total} ${context.translate("chart.maps.banknotes")}</strong>`
    ]);
    return arr;
  }, []);
  mappedData.unshift(["Country", "Banknotes", { role: "tooltip", type: "string", p: { html: true } }]);
  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = mappedData[selection[0].row + 1];
          }
        }
      ]}
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={mappedData}
      options={{
        // This must be also set to render the tooltip with html (vs svg)
        tooltip: { isHtml: true, trigger: "visible" },
        colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
        backgroundColor: '#81d4fa',
        datalessRegionColor: '#f8bbd0',
        defaultColor: '#f5f5f5',
      }}
    />
  );
};

GoogleChart.contextTypes = {
  translate: PropTypes.func
};
