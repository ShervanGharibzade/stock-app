"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function lineChart({ data, loading, name }) {
  const result = data?.results?.values || [];

  let price = [];
  let timeSeries = [];

  result.length > 0 &&
    result?.map((item) => {
      price.push(item.value);
      timeSeries.push(new Date(item.timestamp).getDay());
    });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = timeSeries;

  const dataChart = {
    labels,
    datasets: [
      {
        fill: true,
        label: "stock",
        tension: "0.4",
        data: price,
        borderColor: "rgb(100, 200, 10)",
        backgroundColor: "rgba(100, 200, 10, 0.5)",
      },
    ],
  };

  return (
    <div className="max-w-[800px] w-full my-6 text-center p-5 mx-auto">
      <h2 className="text-3xl text-white font-semibold">Symbol : {name}</h2>
      <Line options={options} data={dataChart} />
    </div>
  );
}
