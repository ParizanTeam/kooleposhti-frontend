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
            <Grid className="BankCard" sx={{width:{lg:"55vmin", md:"55vmin", sm:"50vmin" , xs:"80vmin" }, height:{lg:"30vmin", md:"30vmin", sm:"30vmin" , xs:"45vmin" }}}>
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
                  <Typography sx={{fontSize:{lg:"20px", md:"20px", sm:"15px", xs:"3vmin"}}}>سید عماد موسوی</Typography>
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
            </Grid>
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
