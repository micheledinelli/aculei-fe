import React from "react";
import { Bar } from "react-chartjs-2";
import { PolarArea } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const BarChart = ({ clusterData, clusterId }) => {
  Chart.register(CategoryScale);

  const labels = Object.keys(clusterData);
  const values = Object.values(clusterData);

  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        data: values,
        label: "cluster " + clusterId,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  //  Define chart options
  const config = {
    type: "horizontalBar",
    data,
    options: {
      indexAxis: "y",
      responsive: true,
    },
  };

  return <Bar data={data} options={config} className="w-full h-full" />;
};

export default BarChart;
