import React from 'react';
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

import './style.scss';

function DashboardTeacherProfile(props) {
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
            <Typography component="h2" variant="Button" sx={{ color: 'rgba(10, 67, 94, 0.942)' }}>
              ویرایش حساب کاربری
            </Typography>
            <SignupIcon sx={{ fontSize: 130, color: 'rgba(10, 67, 94, 0.942)', mt: 3 }} />

            <Button sx={{ backgroundColor: 'rgba(10, 67, 94, 0.942)', color: 'white', width: '120px', mt: 1 }}>
              <p style={{ fontSize: '0.8rem' }}>انتخاب عکس</p>
            </Button>

            <ToastContainer rtl={true} />

            <Box component="form" noValidate sx={{ mt: 8 }}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    label="نام "
                    autoFocus
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="last_name"
                    required
                    fullWidth
                    id="last_name"
                    label="نام خانوادگی"
                  />
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
                    name="password1"
                    label="رمز عبور"
                    type="password"
                    id="password1"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth name="mobile" label="شماره موبایل" type="phone" id="mobile" />
                </Grid>
              </Grid>

              <Grid item >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: 'rgba(10, 67, 94, 0.942) !important' }}
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