import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import PaymentCard from 'react-payment-card-component';
import useCreditCardInput from './credi_card_input_hook';
import './style.scss';

function DashboardTeacherBankAccount(props) {
  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  const { handleChange } = useCreditCardInput();

  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Grid container>
          <Grid item xs={12}>
            <Typography className="wallet-parts-title">مشخصات حساب بانکی</Typography>
          </Grid>

          <Grid item xs={12}>
            <div className="BankCard">
              <div className="CardNumber">
                <Grid item xs={12}>
                  <div dir="ltr">
                    <input
                      type="text"
                      name="part-1"
                      maxLength={4}
                      onChange={handleChange}
                      className="credit-card-input"
                      placeholder="****"
                    />
                    <input
                      type="text"
                      name="part-2"
                      maxLength={4}
                      onChange={handleChange}
                      className="credit-card-input"
                      placeholder="****"
                    />
                    <input
                      type="text"
                      name="part-3"
                      maxLength={4}
                      onChange={handleChange}
                      className="credit-card-input"
                      placeholder="****"
                    />
                    <input
                      type="text"
                      name="part-4"
                      maxLength={4}
                      onChange={handleChange}
                      className="credit-card-input"
                      placeholder="****"
                    />
                  </div>
                </Grid>
              </div>
              <Grid container sx={{ direction: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} className="CardName">
                  <p>سید عماد موسوی</p>
                </Grid>
                <Grid item xs={12} mt={2} dir="ltr">
                  <span style={{ fontSize: '15px', color: 'white' }}>IR</span>
                  <input
                    className="shaba"
                    autoComplete="IR02019***********************"
                    name="ShabaNumber"
                    id="ShabaNumber"
                    label="شماره شبا"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                    maxLength={24}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sx={{alignItems:"center", justifyContent:"center", display:"flex"}}>
            <Button className='credit-card-submit' variant="contained" sx={{width:"130px"}}>تایید</Button>
          </Grid>
        </Grid>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherBankAccount;
