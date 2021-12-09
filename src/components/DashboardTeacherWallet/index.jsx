import React from 'react';
import { Button, TextField, Grid} from '@mui/material';
import './style.scss';
function DashboardTeacherWallet(props) {
  return (
    <div>
      <div>
        {/*<React.Fragment>
          <h1> کیف پول</h1>
        </React.Fragment>*/}
        <div className='BankCard' dir='ltr'>
          <div className='CardNumber'>
          <Grid item xs={12}>
            <TextField
              autoComplete="6037 **** **** 8080"
              name="CardNumber"
              id="CardNumber"
              label="شماره کارت"
            />
          </Grid>
          </div>
          <div className='CardName'>
            <p>سینا عمرانی</p>
          </div>
          <div className='Shaba'>
            <Grid item xs={12}>
              <TextField
                autoComplete="IR02019***********************"
                name="ShabaNumber"
                id="ShabaNumber"
                label="شماره شبا"
              />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTeacherWallet;
