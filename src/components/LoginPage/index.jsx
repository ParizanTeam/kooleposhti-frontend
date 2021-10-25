import React from 'react';
import Recaptcha from 'react-recaptcha';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';

import './style.scss';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

function Copyright(props) {
  return (
    <Typography color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Kooleposhti
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const handleSubmit = event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  // eslint-disable-next-line no-console
  console.log({
    email: data.get('email'),
    password: data.get('password'),
  });
};

const LoginPage = () => {
  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div dir="rtl">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                dir: 'rtl !important',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ورود
              </Typography>
              <Box component="form" dir="rtl !important" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  dir="rtl !important"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="نام کاربری یا پست الکترونیک"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="رمز عبور"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
                  $280,000 — $310,000
                </Box>
                <TextField
                  inputProps={{
                    'aria-autocomplete': 'list',
                  }}
                  autoComplete="on"
                  label="Email"
                  type="email"
                  variant="outlined"
                  data-testid="login--email"
                  id="login-email"
                />

                <Recaptcha
                  sitekey="6LfI6N4cAAAAAM5s9zVuo5MJiUYbHYO9Du9cgJSU"
                  render="expilcit"
                  onloadCallback={() => console.log('loaded')}
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="مرا به خاطر بسپار" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  وارد شوید
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      رمز عبور خود را فراموش کرده‌اید؟
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {'حساب کاربری ندارید؟ ثبت نام کنید.'}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>
    </CacheProvider>
  );
};

export default LoginPage;
