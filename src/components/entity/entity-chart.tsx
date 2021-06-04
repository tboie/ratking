import "./entity-chart.scss";

import Chartjs from "react-chartjs-2";

export const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "set 1",
      data: [12, 19, 3, 15, 12, 3],
      fill: false,
      backgroundColor: "rgba(40, 255, 58, 0.85)",
      borderColor: "rgba(40, 255, 58 0.6)",
    },
    {
      label: "set 2",
      data: [2, 9, 14, 8, 4, 10],
      fill: false,
      backgroundColor: "rgba(40, 237, 255, 0.85)",
      borderColor: "rgba(40, 237, 255, 0.6)",
    },
    {
      label: "set 3",
      data: [6, 4, 15, 10, 12, 11],
      fill: false,
      backgroundColor: "rgba(58, 40, 255, 0.85)",
      borderColor: "rgba(58, 40, 255, 0.6)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

type ChartProps = {
  type: "bar" | "line";
};

const Chart = ({ type }: ChartProps) => {
  return (
    <Chartjs className="chart" data={data} options={options} type={type} />
  );
};

export default Chart;
