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
import { toast, ToastContainer } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import './style.scss';
import { convertNumberToPersian, formatPrice } from '../../utils/helpers';

function DashboardTeacherWallet(props) {
  const [price, setPrice] = useState(null);
  const [withdrawLoding, setWithdrawLoading] = useState(false);
  const [bankInfo, setBankInfo] = useState();
  const [loading, setLoading] = useState(true);

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });
  const token = 'JWT ' + localStorage.getItem('access_token');

  const walletWithdraw = () => {
    setWithdrawLoading(true);
    const body = { amount: price };
    console.log(price);
    if(body.amount < 100000)
    {
      toast.error('حداقل مبلغ 100 هزار تومان است', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setWithdrawLoading(false);
      return;
    }
    else if(body.amount/1000 != parseInt(body.amount/1000))
    {
      toast.error('مبلغ باید مضربی از 1000 تومان باشد', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setWithdrawLoading(false);
      return;
    }
    axios
      .post(`${baseUrl}/accounts/wallet/withdraw/`, body, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('withdraw: ', response);
        setWithdrawLoading(false);
        toast.success('برداشت با موفقیت انجام شد', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      })
      .catch(err => {
        setWithdrawLoading(false);
        toast.error('عدم موجودی کافی', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        console.log('error bedeeeeee: ', err);
      });
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/accounts/wallet/mywallet/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('get response: ', response);
          setBankInfo(response.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log('error bedeeeeee: ', err);
        });
    }
    fetchData();
  }, [loading]);

  const checkWithdrawAmountLength = event => {
    if (event.target.value.length > 9) {
      event.target.value = event.target.value.slice(0, 9);
    }
  };
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
          <DashboardTeacherBankAccount card_no={bankInfo.card_no} sheba={bankInfo.sheba} />
          <ToastContainer rtl={true} position="bottom-center" />
          <div style={{ marginTop: '120px' }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography className="wallet-parts-title">اعتبار کیف پول شما</Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                <CountUp
                  className="wallet-credit-counter"
                  start={0}
                  end={bankInfo.balance * 1000}
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

                  <CurrencyInput
                    id="withdraw_amount"
                    name="withdraw_amount"
                    className="wallet-withdraw__textfield"
                    decimalsLimit={3}
                    maxLength={9}
                    onChange={e => {
                      setPrice(convertNumberToPersian(e.target.value));
                    }}
                    
                    onValueChange={(value, name) => setPrice(value)}
                  />
                   تومان را
                  <Button className="wallet-withdraw__button" onClick={walletWithdraw}>
                    {!withdrawLoding && <span>برداشت</span>}
                    {withdrawLoding && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
                  </Button>
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
