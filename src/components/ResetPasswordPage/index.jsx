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
import { useHistory, Link as routerLink, useParams, useLocation } from 'react-router-dom';
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
      'رمز عبور شما باید شامل 8 کارکتر باشد. علاوه بر اون، باید حتما یک حرف انگلیسی و یک عدد در رمزعبورت وجود داشته باشه.'
    ),
  password2: yup
    .string('')
    .required('باید حتما رمز عبور جدیدت رو بنویسی.')
    .oneOf([yup.ref('password1')], 'تکرار رمزعبور باید با رمزعبور یکسان باشه!'),
});

const ResetPasswordPage = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const uid = query.get('uid');
  const formik = useFormik({
    initialValues: {
      password1: '',
      password2: '',
    },

    onSubmit: async values => {
      try {
        const res = await axios.post('https://kooleposhti.herokuapp.com/accounts/users/reset_password_confirm/', {
          new_password: values.password1,
          re_new_password: values.password1,
          uid,
          token,
        });
        toast.success('رمز عبور باموفقیت تغییر یافت.');
        history.push('/');
      } catch (error) {
        toast.error('متاسفانه تو ارتباط شما با سرور مشکلی بوجود اومد.', {
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
            <Avatar className="reset-password-avatar" sx={{ m: 1 }}>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="reset-password-button"
                sx={{ mt: 3, mb: 2 }}
              >
                ارسال
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
};

export default ResetPasswordPage;
