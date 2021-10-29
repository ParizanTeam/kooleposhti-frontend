import * as React from 'react';
import './style.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, Link as routerLink } from 'react-router-dom';
import * as yup from 'yup';
import rtl from 'jss-rtl';
import axios from 'axios';
import { color, padding } from '@mui/system';
import img from '../../assets/images/forget-password.jpg';
import './style.scss';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

const validationSchema = yup.object({
  email: yup.string('').email('ایمیلی که وارد کردی درست نیست🤔').required('باید حتما ایمیلت رو بنویسی.'),
});

const ForgetPasswordPage = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
    },

    onSubmit: async values => {
      try {
        const res = await axios.post('https://kooleposhti.herokuapp.com/auth/jwt/create/', {
          email: values.email,
        });
        history.push('/');
      } catch (error) {
        console.log('hello world');
        toast.error('نام کاربری یا رمز عبورت اشتباهه!', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'toast-error',
        });
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div dir="rtl">
        <Helmet>
          <title>فراموش کردن رمز عبور</title>
        </Helmet>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={false}
            md={7}
            sx={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={12} md={5} component={Paper} elevation={15} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <HelpOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                رمز عبورتو یادت رفته؟
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                margin="normal"
                sx={{ mt: 7, pr: 5, pl: 5 }}
                className="forget-password__text"
              >
                بعد از وارد کردن ایمیلت، ما یک پیام برات می‌فرستیم و شما از طریق اون پیام می‌تونی رمز عبور جدیدت رو ثبت
                کنی.
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                setFieldValue
                sx={{ mt: 4, width: '90%' }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  dir="rtl"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  ارسال
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </CacheProvider>
  );
};

export default ForgetPasswordPage;
