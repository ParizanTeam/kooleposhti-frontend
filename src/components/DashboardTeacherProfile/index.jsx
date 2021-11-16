import React, { useState, useEffect, useRef } from 'react';
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
import { Formik } from 'formik';
import profile_1 from '../../assets/images/profile_2.png';
import ReactLoading from 'react-loading';
import './style.scss';
import axios from '../../utils/axiosConfig';

function DashboardTeacherProfile(props) {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [binaryFile, setBinaryFile] = useState(null);
  const [teacher_data, setteacherData] = useState({});

  const token = 'JWT ' + localStorage.getItem('access_token');
  console.log(token);

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get('https://kooleposhti.herokuapp.com/accounts/instructors/me/', {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('get response: ', response);
          setteacherData(response.data);
          if (response.data.image.image !== null || response.data.image.image !== undefined) {
            setFile(response.data.image.image);
          }
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
    fetchData();
  }, []);

  const [file, setFile] = useState(profile_1);
  console.log(file);

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));

    let picture = e.target.files[0];
    console.log('picture', picture);
    setBinaryFile(picture);
  };

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  console.log(teacher_data.username);
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

            <Formik
              enableReinitialize={true}
              initialValues={{
                username: teacher_data.username,
                email: teacher_data.email,
                password: teacher_data.password,
                first_name: teacher_data.first_name,
                last_name: teacher_data.last_name,
                phone_no: teacher_data.phone_no,
              }}
              onSubmit={async values => {
                try {
                  setLoading(true);

                  console.log(token);
                  console.log('pass: ', document.getElementById('password').value);
                  console.log('binary file', binaryFile);

                  const formdata = new FormData();

                  const data = { ...values, 'image.image': binaryFile };
                  formdata.append('username', values.username);
                  formdata.append('email', values.email);
                  formdata.append('first_name', values.first_name);
                  formdata.append('last_name', values.last_name);
                  formdata.append('password', values.password);
                  formdata.append('phone_no', values.phone_no);

                  formdata.append('image.image', binaryFile);
                  console.log('form data', formdata);

                  axios
                    .put('https://kooleposhti.herokuapp.com/accounts/instructors/me/', formdata, {
                      headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                      },
                    })
                    .then(response => {
                      console.log(response);
                      toast.success('با موفقیت به‌روز شد', {
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
                      setLoading(false);
                      console.log('error');
                      toast.error('شرمنده یه بار دیگه امتحان کن !!!', {
                        position: 'bottom-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                        theme: 'dark',
                      });
                    });
                } catch (error) {
                  if (error === 'username') {
                    toast.error('این نام کاربری قبلا انتخاب شده', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'dark',
                    });
                  } else if (error === 'email') {
                    toast.error('این ایمیل قبلا در سیستم ثبت شده', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'dark',
                    });
                  } else if (error === 'activate') {
                    toast.error('مشکلی پیش اومده بعدا دوباره امتحان کن', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'dark',
                    });
                  }
                }
              }}
              validateOnChange={validateAfterSubmit}
              validate={values => {
                let error = {};

                if (!values.username) {
                  error.username = ' نام کاربری خودت رو وارد کن';
                } else if (!values.email) {
                  error.email = ' ایمیل خودت رو وارد کن';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  error.email = 'ایمیل نامعتبر';
                }

                return error;
              }}
            >
              {({ handleSubmit, handleChange, setFieldValue, values, errors, handleBlur }) => (
                <Box
                  component="form"
                  id="profile-form"
                  noValidate
                  sx={{ mt: 8 }}
                  onSubmit={e => {
                    e.preventDefault();
                    setValidateAfterSubmit(true);
                    handleSubmit();
                  }}
                >
                  <ToastContainer rtl={true} />
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        value={values.first_name}
                        InputLabelProps={{ shrink: values.first_name }}
                        autoComplete="given-name"
                        name="first_name"
                        fullWidth
                        id="first_name"
                        label="نام "
                        autoFocus
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.first_name : null}
                        error={Boolean(errors.first_name)}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        autoComplete="given-name"
                        InputLabelProps={{ shrink: values.last_name }}
                        name="last_name"
                        fullWidth
                        id="last_name"
                        label="نام خانوادگی"
                        value={values.last_name}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.last_name : null}
                        error={Boolean(errors.last_name)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={values.username}
                        InputLabelProps={{ shrink: values.username }}
                        autoComplete="given-name"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="نام کاربری"
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.username : null}
                        error={Boolean(errors.username)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        InputLabelProps={{ shrink: values.email }}
                        fullWidth
                        id="email"
                        label="ایمیل"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.email : null}
                        error={Boolean(errors.email)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        InputLabelProps={{ shrink: values.password }}
                        label="رمز عبور جدید"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.password : null}
                        error={Boolean(errors.password)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        InputLabelProps={{ shrink: values.phone_no }}
                        name="phone_no"
                        label="شماره موبایل"
                        type="phone"
                        id="phone_no"
                        value={values.phone_no}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.phone_no : null}
                        error={Boolean(errors.phone_no)}
                      />
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
                      {!loading && <span>تایید</span>}
                      {loading && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
                    </Button>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherProfile;
