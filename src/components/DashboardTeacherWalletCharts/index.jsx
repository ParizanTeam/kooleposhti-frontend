import React from "react";
import ReactDOM from "react-dom";
import {Bar, Line, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import Wallet from '../../assets/images/Wallet-icon.png';
import "./styles.scss";
import { KeyBindingUtil } from "draft-js";
import { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axiosConfig';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import ReactLoading from 'react-loading';
import { useMediaQuery } from '@mui/material';

/*function orderss(){
  const myOrder=[];
  for (const property in diagramData) {
    myOrder.push(property.amount);
  }
  return (
    myOrder
  );
}*/

/*function Generate(element) {
  const newData={}
  newData.label = element.title;
  newData.fill= false;
  newData.borderColor= "rgba(255, 0, 0, 0.3)";
  newData.borderWidth= 2;
  newData.pointRadius= 2;
  newData.data= [];
  for (const property in element.orders) {
    newData.data.push(property.amount);
  }
  return (
    newData
  );
  }*/

function DashboardTeacherWalletCharts() {
  const [tansferHistory, setTansferHistory] = useState(null);
  const [diagramData, setDiagramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
      axios
      .get(`${baseUrl}/accounts/instructors/course-orders/`)
      .then(res => {
        setDiagramData(res.data);
        console.log('DiagramData', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);
  const myOrder=[];
  const Names=[];
  for (const i in diagramData) {
    let newOrder = []
    let newName=diagramData[i]['title'];
    let v= 0;
    for (const property in diagramData[i]['orders']) {
      console.log(property);
      //newOrder.push(diagramData[i]['orders'][property].amount);
      v = v+diagramData[i]['orders'][property].amount;
    }
    myOrder.push(v);
    Names.push(newName);
  }
  console.log(myOrder);
  console.log(Names);
  //const myData = diagramData.map(item => Generate(item));
  /*const or1 = orderss(diagramData[0].);
  const or2 = orderss(diagramData[1]);
  const or3 = orderss(diagramData[2]);*/
  const data = {
    labels: [
      Names[0],
      Names[1],
      Names[2],
      Names[3],
      Names[4],
      Names[5],
      Names[6]
    ],
    //backgroundColor: ['rgba(255,0,0,1)'],
    //lineTension: 1,
    datasets: [
      {
        label:'کلاسهای من',
        fill: false,
        //borderColor: "rgba(255, 0, 0, 0.3)",
        //borderColor: "mediumseagreen",
        borderColor: "blue",
        borderWidth: 2,
        pointRadius: 2,
        data: myOrder
      },
      /*{
        label:Names[1],
        fill: false,
        borderColor: "mediumseagreen",
        borderWidth: 2,
        pointRadius: 2,
        data: myOrder[1]
      },
      {
        label: Names[2],
        fill: false,
        borderColor: "blue",
        borderWidth: 2,
        pointRadius: 2,
        data: myOrder[2]
      }*/
    ]
  };

  var options = {
    maintainAspectRatio : false,
    responsive:true,
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
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
          <ReactLoading type="spinningBubbles" color="#a5f7e2" height={100} width={100} />
        </div>
      )}
      {!loading && (
      <Line data={data} options={options}/>)}
      </div>
      {/*<div className='wid'>
      <Bar data={data} options={options}/></div>*/}
      {/*<Pie data={pieData} options={options} />*/}
    </div>
  );
}

export default DashboardTeacherWalletCharts;
