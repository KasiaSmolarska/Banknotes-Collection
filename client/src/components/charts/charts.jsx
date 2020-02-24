import React from "react";
import Chart from "react-apexcharts";
import chartOptions from "../../utils/chartConfig";

const { areaChartOptions } = chartOptions;

const sortData = unsortedData => {
  let sortedData = {};
  Object.keys(unsortedData)
    .sort()
    .forEach(function(v, i) {
      sortedData[v] = unsortedData[v];
    });
  return sortedData;
};

export const getSearchingField = (banknotesList, value) => {
  const values = {};
  banknotesList.map(banknote => {
    let searchingField = banknote[value];
    if (!!searchingField) {
      return values[searchingField] ? (values[searchingField] += 1) : (values[searchingField] = 1);
    }
  });
  return values;
};

export const DefaultChart = ({ banknotesList, value, chartId, seriesName, color }) => {
  const sortedData = sortData(getSearchingField(banknotesList, value));
  console.log("sort", sortedData);
  const chart = {
    options: {
      ...areaChartOptions,
      chart: {
        ...areaChartOptions.chart,
        id: chartId
      },
      xaxis: {
        ...areaChartOptions.xaxis,
        categories: Object.keys(sortedData)
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
        name: seriesName,
        data: Object.values(sortedData)
      }
    ]
  };
  console.log(chart);

  return <Chart options={chart.options} series={chart.series} type="area" height="100" />;
};

export const BanknotesChart = ({ banknotesList }) => {
  const getTime = () => {
    const timeAdded = {};
    banknotesList.map(banknote => {
      let day = new Date(banknote.dateCreated).toLocaleDateString();
      return timeAdded[day] ? (timeAdded[day] += 1) : (timeAdded[day] = 1);
    });
    return timeAdded;
  };

  const sortedData = sortData(getTime(banknotesList));

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
        name: "banknotes added",
        data: Object.values(sortedData)
      }
    ]
  };
  return <Chart options={chart.options} series={chart.series} type="area" height="100" />;
};
