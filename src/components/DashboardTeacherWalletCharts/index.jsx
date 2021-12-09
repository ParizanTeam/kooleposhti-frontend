import React from "react";
import ReactDOM from "react-dom";
import {Bar, Line, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import "./styles.scss";

function DashboardTeacherWalletCharts() {
  const data = {
    labels: [
      "1400/09/13",
      "1400/09/14",
      "1400/09/15",
      "1400/09/16",
      "1400/09/17",
      "1400/09/18",
      "1400/09/19"
    ],
    //backgroundColor: ['rgba(255,0,0,1)'],
    //lineTension: 1,
    datasets: [
      {
        label: "نقاشی میتدی 01",
        fill: false,
        borderColor: "rgba(255, 0, 0, 0.3)",
        borderWidth: 1,
        pointRadius: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "نثاشی مبتدی 02",
        fill: false,
        borderColor: "rgba(0, 255, 0, 0.3)",
        borderWidth: 1,
        pointRadius: 2,
        data: [70, 32, 45, 65, 87, 92, 99]
      },
      {
        label: "نقاشی پیشرفته 01",
        fill: false,
        borderColor: "blue",
        borderWidth: 2,
        pointRadius: 2,
        data: [135, 91, 125, 144, 143, 143, 139]
      }
    ]
  };

  var options = {
    legend: {
      position: "right",
      labels: {
        boxWidth: 10
      }
    },
    scales: {
      xAxes: [
        {
          ticks: { display: false }
        }
      ]
    }
  };

const pieData = {
	labels: [
		'نقاشی مبتدی 01',
		'نقاشی پیشرفته 02',
		'نقاشی مبتدی 02'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'rgba(255,0,0, 1)',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

  return (
    <div className="charts">
      <div className='wid'>
      <Line data={data} options={options}/></div>
      <div className='wid'>
      <Bar data={data} options={options}/></div>
      {/*<Pie data={pieData} options={options} />*/}
    </div>
  );
}

export default DashboardTeacherWalletCharts;
