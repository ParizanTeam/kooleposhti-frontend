import React from 'react';
import { Typography, Grid, Button } from '@mui/material';
import DashboardTeacherBankAccount from '../DashboardTeacherBankAccount';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CountUp from 'react-countup';
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
              end={100}
              duration={2.75}
              separator=" "
              decimals={3}
              decimal=","
              prefix=""
              suffix="تومان"
            />
          </Grid>
        </Grid>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherWallet;
