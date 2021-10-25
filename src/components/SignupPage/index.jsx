import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
/* import Recaptcha from 'react-recaptcha'; */
import './style.scss';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Koolephoshti
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


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
  const [apiResponse, setApiResponse] = useState('');

  return (
    <CacheProvider value={cacheRtl}>
      {apiResponse === 201 && <Redirect to="/email-verification" />}
      {apiResponse !== 201 && (
        <div dir="rtl">
          <Container maxWidth="sm" component="main">
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

              <Grid>
                <img src={background} alt="" className="responsive" />
              </Grid>

              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  re_password: '',
                  /*                 recaptcha:"" */
                }}
                onSubmit={async values => {
                  axios
                    .post('https://kooleposhti.herokuapp.com/auth/users/', JSON.stringify(values), {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    })
                    .then(response => {
                      console.log('status is: ', response.status);
                      setApiResponse(response.status);
                    })
                    .catch(error => console.log('error: ', error));
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
                  } else if (!values.password) {
                    error.password = 'لطفا رمز عبور خود را وارد کنید';
                  } else if(values.password.length<8)
                  {
                    error.password ='طول رمز کمتر از 8 کاراکتر است'
                  }
                  else if(/^\d+$/i.test(values.password))
                  {
                    error.password = "ایمیل نباید فقط متشکل از اعداد باشد"
                  }
                  else if (!values.re_password) {
                    error.re_password = 'لطفا رمز عبور خود را دوباره وارد کنید';
                  } else if (values.re_password !== values.password) {
                    error.re_password = 'با رمز اصلی تطابق ندارد';
                  }
                  /*  else if(values.recaptcha === "")
                {
                    error.recaptcha = "not human";
                } */

                  return error;
                }}
              >
                {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
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
                          helperText={errors.username}
                          error={Boolean(errors.username)}
                        />
                      </Grid>
                      {/*                     <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="نام خانوادگی"
                        name="lastName"
                        autoComplete="family-name"
                        value={values.lastName}
                        onChange={handleChange}
                        helperText={errors.lastName}

                        error={Boolean(errors.lastName)}
                      />
                    </Grid> */}
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
                          helperText={errors.email}
                          error={Boolean(errors.email)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="رمز عبور"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          value={values.password}
                          onChange={handleChange}
                          helperText={errors.password}
                          error={Boolean(errors.password)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="re_password"
                          label="تکرار رمز عبور"
                          type="password"
                          id="re_password"
                          autoComplete="new-password"
                          value={values.re_password}
                          onChange={handleChange}
                          helperText={errors.re_password}
                          error={Boolean(errors.re_password)}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ mt: 1 }}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">حساب کاربری</FormLabel>
                          <RadioGroup
                            row
                            aria-label="Acccount Type"
                            defaultValue="Student"
                            name="radio-buttons-type-group"
                            sx={{ mt: 1 }}
                          >
                            <FormControlLabel value="Student" control={<Radio />} label="دانش آموز" />
                            <FormControlLabel value="Teacher" control={<Radio />} label="معلم" />
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

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                      ثبت نام
                    </Button>
                    <Grid container justifyContent="flex-start">
                      <Grid item>
                        <Container sx={{ mt: 2, mr: 0 }}>
                          <Link
                            sx={{
                              textDecoration: 'none',
                              color: 'black',
                              fontSize: '13px',
                              mr: 0,
                            }}
                            href="/login"
                            variant="body2"
                          >
                            قبلا ثبت نام کرده اید؟
                            <Button sx={{ color: 'rgb(76, 175, 80)', fontSize: '15px' }}>ورود</Button>
                          </Link>
                        </Container>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Formik>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,160L14.1,170.7C28.2,181,56,203,85,197.3C112.9,192,141,160,169,128C197.6,96,226,64,254,48C282.4,32,311,32,339,64C367.1,96,395,160,424,176C451.8,192,480,160,508,149.3C536.5,139,565,149,593,165.3C621.2,181,649,203,678,229.3C705.9,256,734,288,762,282.7C790.6,277,819,235,847,202.7C875.3,171,904,149,932,160C960,171,988,213,1016,224C1044.7,235,1073,213,1101,170.7C1129.4,128,1158,64,1186,80C1214.1,96,1242,192,1271,213.3C1298.8,235,1327,181,1355,133.3C1383.5,85,1412,43,1426,21.3L1440,0L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"
            ></path>
          </svg>
        </div>
      )}

    </CacheProvider>
  );
}
