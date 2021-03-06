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
      <div className='chartIn'>
      <DashboardTeacherWalletCharts/></div>
      <StyledEngineProvider injectFirst>
        <div>
          <RecievedList />
        </div>
      </StyledEngineProvider>
  </div>
  );
}

export default DashboardTeacherRecieved;
