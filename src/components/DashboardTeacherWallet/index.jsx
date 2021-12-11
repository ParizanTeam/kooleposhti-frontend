import React from 'react';
import { Typography, Grid, Button, Avatar, TextField } from '@mui/material';
import DashboardTeacherBankAccount from '../DashboardTeacherBankAccount';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CountUp from 'react-countup';
import wallet from '../../assets/images/wallet.jpg';
import './style.scss';

function DashboardTeacherWallet(props) {
  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  return (
    <CacheProvider value={cacheRtl}>
      <DashboardTeacherBankAccount />
      <div style={{ marginTop: '120px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="wallet-parts-title">اعتبار کیف پول شما</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
            <CountUp
              className="wallet-credit-counter"
              start={0}
              end={120}
              duration={2.75}
              separator=" "
              decimals={3}
              decimal=","
              prefix=""
              suffix="تومان"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
            <img src={wallet} alt="wallet" />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
            <Typography className="wallet-withdraw">
              مبلغ
              <TextField
                className="wallet-withdraw__textfield"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  maxLength: 12
                }}
              />
              تومان را
              <Button className="wallet-withdraw__button">برداشت</Button>
              میکنم
            </Typography>
          </Grid>
        </Grid>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherWallet;
