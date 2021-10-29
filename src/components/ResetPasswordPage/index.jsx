import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
import imageSrc from '../../assets/images/teaching-students-online-internet-learning-computer-programming_335657-3119.jpg';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

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
  password1: yup
    .string('')
    .required('باید حتما رمز عبور جدیدت رو بنویسی.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/,
      'رمز عبور شما باید شامل 8 کارکتر باشد. همچنین باید حتما یک حرف انگلیسی و یک عدد در رمزعبورتون وجود داشته باشه.'
    ),
  password2: yup
    .string('')
    .required('باید حتما رمز عبور جدیدت رو بنویسی.')
    .oneOf([yup.ref('password')], 'تکرار رمزعبور باید با رمزعبور یکسان باشه!'),
});

function Copyright(props) {
  return (
    <div className="my-footer__bylove">
      <span className="my-footer__content__s">ساخته شده با</span>
      <div className="my-footer__content__h">
        <span>&hearts;</span>
      </div>
      <span className="my-footer__content__s">در ایران</span>
    </div>
  );
}

const ResetPasswordPage = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      password1: '',
      password2: '',
    },

    onSubmit: async values => {
      try {
        const res = await axios.post('https://kooleposhti.herokuapp.com/auth/jwt/create/', {
          password1: values.email,
          password2: values.password,
        });
        history.push('/');
      } catch (error) {
        toast.error('رمزعبور نمیتونه با نام کاربری یکسان باشه.', {
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
          <title>ورود</title>
        </Helmet>
        <ToastContainer rtl={true} />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              dir: 'rtl !important',
              fontFamily: 'iranyekan',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontFamily: 'iranyekan' }}>
              عوض کردن رمز عبور
            </Typography>
            <Box
              component="form"
              dir="rtl !important"
              //onSubmit={handleSubmit}
              noValidate
              onSubmit={formik.handleSubmit}
              setFieldValue
              sx={{ mt: 1, fontFamily: 'iranyekan' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password1"
                label="رمز عبور"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={formik.values.password1}
                onChange={formik.handleChange}
                error={formik.touched.password1 && Boolean(formik.errors.password1)}
                helperText={formik.touched.password1 && formik.errors.password1}
                sx={{ fontFamily: 'iranyekan' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="تکرار رمز عبور"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={formik.values.password2}
                onChange={formik.handleChange}
                error={formik.touched.password2 && Boolean(formik.errors.password2)}
                helperText={formik.touched.password2 && formik.errors.password2}
                sx={{ fontFamily: 'iranyekan' }}
              />

              {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="مرا به خاطر بسپار" /> */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                ارسال
              </Button>
              {/* <Grid container> */}
              <Grid item xs sx={{ mt: 3, mb: 2 }}>
                <Link to="/forget-password" component={routerLink} variant="body2">
                  رمز عبور خود را فراموش کرده‌اید؟
                </Link>
              </Grid>
              <Grid item sx={{ mt: 3, mb: 2 }}>
                <Link to="/signup" component={routerLink} variant="body2" sx={{ mt: 3, mb: 2 }}>
                  {'هنوز عضو نشدی؟! همین حالا عضو شو.'}
                </Link>
              </Grid>
              {/* </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </CacheProvider>
  );
};

export default ResetPasswordPage;