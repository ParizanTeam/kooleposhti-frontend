import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import PaymentCard from 'react-payment-card-component';
import useCreditCardInput from './credi_card_input_hook';
import { baseUrl } from '../../utils/constants';
import { toast, ToastContainer } from 'react-toastify';
import ReactLoading from 'react-loading';
import axios from '../../utils/axiosConfig';
import './style.scss';

function DashboardTeacherBankAccount(props) {
  const [loading, setLoading] = useState(false);
  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  const token = 'JWT ' + localStorage.getItem('access_token');
  const { handleChange } = useCreditCardInput();
  const checklenght = event => {
    if (event.target.value.length > 4) {
      event.target.value = event.target.value.slice(0, 4);
    }
  };

  const checkShabaLenght = event => {
    if (event.target.value.length > 24) {
      event.target.value = event.target.value.slice(0, 24);
    }
  };
  const submitCardInfo = () => {
    setLoading(true);
    const body = {
      card_no:
        document.getElementById('part-1').value +
        document.getElementById('part-2').value +
        document.getElementById('part-3').value +
        document.getElementById('part-4').value,
      sheba: document.getElementById('ShabaNumber').value,
    };
    console.log(body);
    axios
      .patch(`${baseUrl}/accounts/wallet/mywallet/`, body, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('get response: ', response);
        toast.success('اطلاعات با موفقیت تغییر یافت', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setLoading(false);
      })
      .catch(err => {
        console.log('error bedeeeeee: ', err);
        toast.error('اطلاعات با موفقیت تغییر یافت', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setLoading(false);
      });
  };

  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Grid container>
          <Grid item xs={12}>
            <Typography className="wallet-parts-title">مشخصات حساب بانکی</Typography>
          </Grid>
          <ToastContainer rtl={true} position="bottom-center" />
          <Grid item xs={12}>
            <Grid
              className="BankCard"
              sx={{
                width: { lg: '450px', md: '450px', sm: '350px', xs: '80vmin' },
                height: { lg: '250px', md: '250px', sm: '200px', xs: '45vmin' },
              }}
            >
              <div className="CardNumber">
                <Grid item xs={12}>
                  <div dir="ltr">
                    <input
                      defaultValue={props.card_no.slice(0, 4)}
                      type="number"
                      id="part-1"
                      name="part-1"
                      maxLength={4}
                      onChange={handleChange}
                      className="credit-card-input"
                      placeholder="****"
                    />
                    <input
                      defaultValue={props.card_no.slice(4, 8)}
                      type="number"
                      id="part-2"
                      name="part-2"
                      maxLength={4}
                      onChange={handleChange}
                      className="credit-card-input"
                      placeholder="****"
                    />
                    <input
                      defaultValue={props.card_no.slice(8, 12)}
                      type="number"
                      id="part-3"
                      name="part-3"
                      maxLength={4}
                      onChange={handleChange}
                      className="credit-card-input"
                      placeholder="****"
                    />
                    <input
                      defaultValue={props.card_no.slice(12, 16)}
                      type="number"
                      id="part-4"
                      name="part-4"
                      maxLength={4}
                      onChange={checklenght}
                      className="credit-card-input"
                      placeholder="****"
                    />
                  </div>
                </Grid>
              </div>
              <Grid container>
                <Grid item xs={12} className="CardName">
                  <Typography sx={{ fontSize: { lg: '20px', md: '20px', sm: '15px', xs: '3vmin' } }}>
                    سید عماد موسوی
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={2} dir="ltr">
                  <span style={{ fontSize: '15px', color: 'white' }}>IR</span>
                  <input
                    defaultValue={props.sheba}
                    className="shaba"
                    autoComplete="IR02019***********************"
                    name="ShabaNumber"
                    id="ShabaNumber"
                    label="شماره شبا"
                    type="number"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                    pattern="\d*"
                    onChange={checkShabaLenght}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Button className="credit-card-submit" variant="contained" sx={{ width: '130px' }} onClick={submitCardInfo}>
              {!loading && <span>تایید</span>}
              {loading && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
            </Button>
          </Grid>
        </Grid>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherBankAccount;
