import React from 'react';
import DashboardTeacherWalletCharts from '../DashboardTeacherWalletCharts';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import RecievedList from './RecievedList';
import './style.scss';
function DashboardTeacherRecieved(props) {
  return (
    <div style={{padding:'5px'}}>
      {/*<React.Fragment>
        <h1>دریافت ها</h1>
      </React.Fragment>*/}
      <DashboardTeacherWalletCharts/>
      <StyledEngineProvider injectFirst>
        <RecievedList />
      </StyledEngineProvider>
  </div>
  );
}

export default DashboardTeacherRecieved;
