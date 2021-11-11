import React, { useState } from 'react';
import SignupIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import FormData from 'form-data';
import profile_1 from '../../assets/images/profile_2.png';

import './style.scss';
import axios from 'axios';

function DashboardTeacherProfile(props) {
  const editProfile = event => {
    event.preventDefault();
    const token = 'JWT ' + localStorage.getItem('access_token');

    console.log(token);
    console.log("pass: " , document.getElementById('password').value);

    const body = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      password: document.getElementById('password').value,
      phone_no: document.getElementById('phone_no').value,
    };
    console.log(body);

    axios
      .put('https://kooleposhti.herokuapp.com/accounts/instructors/me/', JSON.stringify(body), {
        headers: {
          'Authorization' : token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {console.log(response)})
      .catch(err => {
        console.log("error");
      });
  };

  const [file, setFile] = useState(profile_1);
  console.log(file);

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Helmet>
          <title>پروفایل</title>
        </Helmet>
        <ToastContainer />

        <Container maxWidth="md" component="main" sx={{ margin: 'auto auto 30px auto' }}>
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'iranyekan',
            }}
          >
            <Typography
              component="h2"
              variant="Button"
              sx={{ color: 'rgba(10, 67, 94, 0.942)', fontSize: { sm: '3vmin', xs: '4vmin' } }}
            >
              ویرایش حساب کاربری
            </Typography>
            <Avatar src={file} alt="profile" sx={{ mt: 1, width: '18vmin', height: '18vmin', borderRadius: '50%' }} />

            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: 'rgba(10, 67, 94, 0.942)', color: 'white', width: '120px', mt: 2 }}
            >
              <p style={{ fontSize: '0.8rem' }}>انتخاب عکس</p>
              <input type="file" hidden onChange={handleChange} />
            </Button>

            <ToastContainer rtl={true} />

            <Box component="form" id="profile-form" noValidate sx={{ mt: 8 }} onSubmit={editProfile}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="first_name"
                    fullWidth
                    id="first_name"
                    label="نام "
                    autoFocus
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField autoComplete="given-name" name="last_name" fullWidth id="last_name" label="نام خانوادگی" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="نام کاربری"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="email" label="ایمیل" name="email" autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="رمز عبور جدید"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name="phone_no" label="شماره موبایل" type="phone" id="phone_no" />
                </Grid>
              </Grid>

              <Grid item>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: 'rgba(10, 67, 94, 0.942) !important' }}
                  typeof="submit"
                >
                  تایید
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherProfile;
