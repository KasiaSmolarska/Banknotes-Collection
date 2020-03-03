import React from "react";
import PropTypes from "prop-types";
import chartOptions from "../../utils/chartConfig";
import { getCountryName } from "../../utils/countriesCodes";
const Chart = React.lazy(() => import("react-apexcharts"));

const { areaChartOptions } = chartOptions;

const sortData = unsortedData => {
  let data = {};
  if (!unsortedData) {
    return {};
  }
  unsortedData.forEach(function(v, i) {
    data[v._id] = v.total;
  });
  const sortData = {};
  Object.keys(data)
    .sort()
    .forEach(date => (sortData[date] = data[date]));
  return sortData;
};

const parseCategories = (chartId, sortedData, context) => {
  switch (chartId) {
    case "countries-chart":
      return Object.keys(sortedData).map(key => getCountryName(key));
    case "continents-chart":
      return Object.keys(sortedData).map(continent => {
        return context.translate(`continent.${continent.replace(/ /g, "")}`);
      });
    default:
      return Object.keys(sortedData);
  }
};

export const DefaultChart = ({ value, chartId, seriesName, color }, context) => {
  const sortedData = sortData(value);
  const chart = {
    options: {
      ...areaChartOptions,
      chart: {
        ...areaChartOptions.chart,
        id: chartId
      },
      xaxis: {
        ...areaChartOptions.xaxis,
        categories: parseCategories(chartId, sortedData, context)
      },
      colors: [color],
      theme: {
        palette: "palette2",
        monochrome: {
          enabled: true,
          color: color,
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      }
    },
    series: [
      {
        name: context.translate(`chart.series.${seriesName}`),
        data: Object.values(sortedData)
      }
    ]
  };

  return <Chart options={chart.options} series={chart.series} type="area" height="100" />;
};

DefaultChart.contextTypes = {
  translate: PropTypes.func
};

export const BanknotesChart = ({ value }, context) => {
  const sortedData = sortData(value);

  const chart = {
    options: {
      ...areaChartOptions,
      chart: {
        ...areaChartOptions.chart,
        id: "banknotes-chart"
      },
      xaxis: {
        ...areaChartOptions.xaxis,
        categories: Object.keys(sortedData)
      }
    },
    series: [
      {
        name: context.translate("chart.series.banknotesAdded"),
        data: Object.values(sortedData)
      }
    ]
  };
  return <Chart options={chart.options} series={chart.series} type="area" height="100" />;
};

BanknotesChart.contextTypes = {
  translate: PropTypes.func
};
