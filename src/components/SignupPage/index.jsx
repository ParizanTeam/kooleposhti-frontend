import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Redirect } from 'react-router';
import { Formik } from 'formik';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import background from '../../assets/images/child1.jpg';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
/* import Recaptcha from 'react-recaptcha'; */
import './style.scss';

const cacheRtl = createCache({
  key: 'muirtl',

  stylisPlugins: [rtlPlugin],

  prepend: true,
});

export default function SignUp() {
  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', 'rtl');
  });

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [values, setValues] = useState({});
  const [ loading, setLoading] = useState(false);

  return (
    <CacheProvider value={cacheRtl}>
      {apiResponse && <Redirect to={{ pathname: '/email-verification', state: { values: values } }} />}
      {!apiResponse && (
        <div dir="rtl">
          <Helmet>
            <title>ثبت نام</title>
          </Helmet>

          <div  className="shadow">
          <Container maxWidth="xs" component="main" sx={{margin:"auto auto 30px auto"}}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: 'iranyekan',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography component="h1" variant="Button">
                ثبت نام
              </Typography>

              <ToastContainer rtl={true} />

              <Grid>
                <img src={background} alt="" className="responsive" />
              </Grid>

              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password1: '',
                  password2: '',
                  is_instructor: false,
                  /*                 recaptcha:"" */
                }}
                onSubmit={async values => {
                  try {
                    const res = await axios
                      .post('https://kooleposhti.herokuapp.com/accounts/checkusername/', JSON.stringify(values), {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                      .then(response => {})
                      .catch(err => {
                        throw 'username';
                      });

                    const res2 = await axios
                      .post('https://kooleposhti.herokuapp.com/accounts/checkemail/', JSON.stringify(values), {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                      .then(response => {})
                      .catch(err => {
                        throw 'email';
                      });
                    
                    setLoading(true);
                    const res3 = await axios
                      .post('https://kooleposhti.herokuapp.com/accounts/activate/', JSON.stringify(values), {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                      .then(response => {
                        console.log('status is: ', response.status);
                        setValues(values);
                        setLoading(false);
                        setApiResponse(response.status === 200);
                      })
                      .catch(err => {
                        console.log('error: ', err);
                        throw 'activate';
                      });
                  } catch (error) {
                    if (error === 'username') {
                      toast.error('نام کاربری قبلا انتخاب شده است', {
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
                      toast.error('ایمیل قبلا در سیستم ثبت شده است', {
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
                      toast.error('مشکلی پیش آمده است لطفا دوباره امتحان کنید', {
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
                    error.username = 'لطفا نام کاربری خود را وارد کنید';
                  } else if (!values.email) {
                    error.email = 'لطفا ایمیل خود را وارد کنید';
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    error.email = 'ایمیل نامعتبر';
                  } else if (!values.password1) {
                    error.password1 = 'لطفا رمز عبور خود را وارد کنید';
                  } else if (values.password1.length < 8) {
                    error.password1 = 'طول رمز کمتر از 8 کاراکتر است';
                  } else if (/^\d+$/i.test(values.password1)) {
                    error.password1 = 'رمز عبور نباید فقط متشکل از اعداد باشد';
                  } else if (!values.password2) {
                    error.password2 = 'لطفا رمز عبور خود را دوباره وارد کنید';
                  } else if (values.password2 !== values.password1) {
                    error.password2 = 'با رمز اصلی تطابق ندارد';
                  }

                  /*  else if(values.recaptcha === "")
                {
                    error.recaptcha = "not human";
                } */
                  return error;
                }}
              >
                {({ handleSubmit, handleChange, setFieldValue, values, errors, handleBlur }) => (
                  <Box
                    component="form"
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      setValidateAfterSubmit(true);
                      handleSubmit();
                    }}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="username"
                          required
                          fullWidth
                          id="username"
                          label="نام کاربری"
                          autoFocus
                          value={values.username}
                          onChange={handleChange}
                          helperText={validateAfterSubmit ? errors.username : null}
                          error={Boolean(errors.username)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
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
                          required
                          fullWidth
                          name="password1"
                          label="رمز عبور"
                          type="password"
                          id="password1"
                          autoComplete="new-password"
                          value={values.password1}
                          onChange={handleChange}
                          helperText={validateAfterSubmit ? errors.password1 : null}
                          error={Boolean(errors.password1)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password2"
                          label="تکرار رمز عبور"
                          type="password"
                          id="password2"
                          autoComplete="new-password"
                          value={values.password2}
                          onChange={handleChange}
                          helperText={validateAfterSubmit ? errors.password2 : null}
                          error={Boolean(errors.password2)}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ mt: 1 }}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">حساب کاربری</FormLabel>
                          <RadioGroup
                            row
                            aria-label="Acccount Type"
                            defaultValue="false"
                            name="is_instructor"
                            value={values.is_instructor}
                            sx={{ mt: 1 }}
                            onChange={event => {
                              setFieldValue('is_instructor', event.currentTarget.value);
                            }}
                          >
                            <FormControlLabel value="false" control={<Radio />} label="دانش آموز" />
                            <FormControlLabel value="true" control={<Radio />} label="معلم" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {/* 

                  <div className="recaptcha">
                    <Recaptcha
                      sitekey="6LfI6N4cAAAAAM5s9zVuo5MJiUYbHYO9Du9cgJSU"
                      render="expilcit"
                      verifyCallback={(response) => { setFieldValue("recaptcha", response); }}
                      onloadCallback={() => console.log('loaded')}
                    />
                  </div> */}

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 , backgroundColor:"rgb(69, 15, 194)" }}>
                      {!loading && ثبت نام}
                      {loading && <ReactLoading type="bubbles" color="#fff" />}
                    </Button>
                    <Grid container justifyContent="flex-start">
                      <Grid item>
                        <Container sx={{ mt: 2, mr: 0 }}>
                          <Link
                            sx={{
                              textDecoration: 'none',
                              color: 'black',
                              mr: 0,
                            }}
                            to="/login"
                            variant="body2"
                          >
                            <span style={{fontSize:"13px"}}>قبلا ثبت نام کردی؟</span>
                            <Button sx={{ color: 'rgb(76, 175, 80)', fontSize: '13px' }}>ورود</Button>
                          </Link>
                        </Container>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Formik>
            </Box>
          </Container>
          </div>
        </div>
      )}
    </CacheProvider>
  );
}
