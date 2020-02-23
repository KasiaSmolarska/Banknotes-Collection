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

  const newValues = {
    options: {
      chart: {
        id: "banknotes-chart"
      },
      xaxis: {
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

  const chart = Object.assign(newValues, { options: { ...areaChartOptions } });

  return <Chart options={chart.options} series={chart.series} type="area" height="130" />;
};
