import React from "react";
import ReactDOM from "react-dom";
import {Bar, Line, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import Wallet from '../../assets/images/Wallet-icon.png';
import "./styles.scss";
import { KeyBindingUtil } from "draft-js";

function DashboardTeacherWalletCharts() {
  const data = {
    labels: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه"
    ],
    //backgroundColor: ['rgba(255,0,0,1)'],
    //lineTension: 1,
    datasets: [
      {
        label: "نقاشی مبتدی",
        fill: false,
        borderColor: "rgba(255, 0, 0, 0.3)",
        borderWidth: 2,
        pointRadius: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "نقاشی انسان",
        fill: false,
        borderColor: "mediumseagreen",
        borderWidth: 2,
        pointRadius: 2,
        data: [70, 32, 45, 65, 87, 92, 99]
      },
      {
        label: "نقاشی پیشرفته",
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
        color: "black",
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
      <div className='wid2'>
        <p style={{marginTop:'10px'}}>دریافتی کلاسها</p>
        <img className="wid2__media" src={Wallet} alt='recieved' />
      </div>
      <div className='wid'>
      <Line data={data} options={options}/></div>
      {/*<div className='wid'>
      <Bar data={data} options={options}/></div>*/}
      {/*<Pie data={pieData} options={options} />*/}
    </div>
  );
}

export default DashboardTeacherWalletCharts;
