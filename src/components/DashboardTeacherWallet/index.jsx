import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Avatar, TextField } from '@mui/material';
import DashboardTeacherBankAccount from '../DashboardTeacherBankAccount';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CountUp from 'react-countup';
import wallet from '../../assets/images/wallet.jpg';
import { baseUrl } from '../../utils/constants';
import axios from '../../utils/axiosConfig';
import ReactLoading from 'react-loading';
import './style.scss';
import { convertNumberToPersian, formatPrice } from '../../utils/helpers';

function DashboardTeacherWallet(props) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });
  const token = 'JWT ' + localStorage.getItem('access_token');

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/accounts/instructors/me/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('get response: ', response);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log('error bedeeeeee: ', err);
        });
    }
    fetchData();
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      {loading && (
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <ReactLoading type="spinningBubbles" color="rgb(42, 105, 129)" height={100} width={100} />
          </Grid>
        </Grid>
      )}
      {!loading && (
        <div>
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
                  end={120 * 1000}
                  formattingFn={count => formatPrice(convertNumberToPersian(count)) + ' تومان'}
                  duration={price === null ? 2.75 : 0}
                  separator=" "
                  prefix=""
                  suffix="تومان"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                <img src={wallet} alt="wallet" style={{ maxWidth: '65%' }} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                <Typography className="wallet-withdraw">
                  مبلغ
                  <input
                    value={price}
                    className="wallet-withdraw__textfield"
                    onChange={e => setPrice(convertNumberToPersian(e.target.value))}
                    maxLength={9}
                    data-type="currency"
                  />
                  تومان را
                  <Button className="wallet-withdraw__button">برداشت</Button>
                  میکنم
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </CacheProvider>
  );
}

export default DashboardTeacherWallet;
