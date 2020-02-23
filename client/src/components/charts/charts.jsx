import React from "react";
import Chart from "react-apexcharts";
import chartOptions from "../../utils/chartConfig";

const { areaChartOptions } = chartOptions;

export const BanknotesChart = ({ banknotesList }) => {
  const getTime = () => {
    const timeAdded = {};
    banknotesList.map(banknote => {
      let day = new Date(banknote.dateCreated).toLocaleDateString();
      return timeAdded[day] ? (timeAdded[day] += 1) : (timeAdded[day] = 1);
    });
    return timeAdded;
  };

  const chart = {
    options: {
      ...areaChartOptions,
      chart: {
        ...areaChartOptions.chart,
        id: "banknotes-chart"
      },
      xaxis: {
        ...areaChartOptions.xaxis,
        categories: Object.keys(getTime(banknotesList))
      }
    },
    series: [
      {
        name: "banknotes added",
        data: Object.values(getTime(banknotesList))
      }
    ]
  };
  console.log(chart);
  return <Chart options={chart.options} series={chart.series} type="area" height="100" />;
};
