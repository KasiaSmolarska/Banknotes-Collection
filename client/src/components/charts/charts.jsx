import React from "react";
import PropTypes from "prop-types";
import chartOptionsFile from "../../utils/chartConfig";
import { getCountryName } from "../../utils/countriesCodes";
import { adjustBrightness } from "../../utils/adjustBrightness";
const Chart = React.lazy(() => import("react-apexcharts"));

const { areaChartOptions, lineChartOptions } = chartOptionsFile;

const chartOptions = {
  area: areaChartOptions,
  line: lineChartOptions
};

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
    case "favorites-chart":
      return Object.keys(sortedData).map(key => context.translate(`favorite.${key === "true" ? "favorite" : "others"}`));
    default:
      return Object.keys(sortedData);
  }
};

export const DonutChart = ({ value, chartId, colors, charttype }, context) => {
  const sortedData = sortData(value);
  const chart = {
    options: {
      colors: [...colors],
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: colors.map(color => adjustBrightness(color, -30))
        }
      },
      responsive: [{
        breakpoint: 1000,
        options: {
          chart: {
            height: 200
          },
          legend: {
            position: 'bottom'
          }
        }
    }],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      chart: {
        type: "pie",
        offsetY: 0,
        dropShadow: {
          enabled: false,
          blur: 7,
          left: 1,
          top: 1,
          opacity: 0.1
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 5
      },
      labels: parseCategories(chartId, sortedData, context)
    },
    series: Object.values(sortedData)
  };

  return <Chart options={chart.options} series={chart.series} type={charttype} height="350" />;
};

DonutChart.contextTypes = {
  translate: PropTypes.func
};

export const DefaultChart = ({ value, chartId, seriesName, color, charttype }, context) => {
  const sortedData = sortData(value);
  const chart = {
    options: {
      ...chartOptions[charttype],
      chart: {
        ...chartOptions[charttype].chart,
        id: chartId
      },
      xaxis: {
        ...chartOptions[charttype].xaxis,
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

  return <Chart options={chart.options} series={chart.series} type={charttype} height="100" />;
};

DefaultChart.contextTypes = {
  translate: PropTypes.func
};

export const BanknotesChart = ({ value, charttype }, context) => {
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
  return <Chart options={chart.options} series={chart.series} type={charttype} height="100" />;
};

BanknotesChart.contextTypes = {
  translate: PropTypes.func
};
