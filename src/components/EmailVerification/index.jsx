import React, { useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import VerificationInput from 'react-verification-input';
import image from '../../assets/images/image.jpg';
import image2 from '../../assets/images/image2.jpg';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Redirect } from 'react-router';
import './style.scss';
import { Link } from 'react-router-dom';

function EmailVerification(props) {
  const token = useRef('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [resend, setResend] = useState(false);
  const [counter, setCounter] = useState(120);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorText, setErrorText] = useState('مشکلی پیش آمده است لطفا دوباره امتحان کنید');

  if (verified && !error) {
    setVerified(false);
    axios
      .post('https://kooleposhti.herokuapp.com/accounts/signup/', JSON.stringify(props.location.state.values), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log('status is: ', res.status);
        setIsSignedUp(res.status === 201);
      })
      .catch(err => {
        console.log('error: ', err);
        setError(true);
      });
  }

  const resend_code = event => {
    event.preventDefault();
    console.log('verified');
    const info = { email: props.location.state.values.email, username: props.location.state.values.username };

    axios
      .post('https://kooleposhti.herokuapp.com/accounts/activate/', info, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('status is: ', response.status);
      })
      .catch(err => {
        console.log('error: ', err);
        setError(true);
      });
  };
  const verify = event => {
    event.preventDefault();
    console.log('verified');
    setError(false);
    const info = { email: props.location.state.values.email ?? null, token: token.current.value ?? null };

    axios
      .post('https://kooleposhti.herokuapp.com/accounts/checkcode/', info, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('status is: ', response.status);
        setVerified(response.status === 202);
      })
      .catch(err => {
        console.log('error: ', err);
        setError(true);
      });
  };

  return (
    <div>
      {props.location.state === undefined && <Redirect to="*" />} {/* not existing url to redirect to NOtFound Page */}
      {props.location.state !== undefined && isSignedUp && <Redirect to="/" />}
      {props.location.state !== undefined && !isSignedUp && (
        <Container maxWidth="sm" component="main">
          <Box sx={{ mt: 12 }}>
            <Grid container spacing={1} align="center" justify="center" alignItems="center">
              <Grid item xs={12} sm={12}>
                <Grid container>
                  {error && (
                    <Alert sx={{ margin: '10px auto 50px auto' }} onClose={event => {}} severity="error">
                      {errorText}
                    </Alert>
                  )}
                  <Grid item xs={12}>
                    <Typography variant="h4" color="text.secondary" align="center">
                      لطفا کد تایید ایمیل را وارد کنید
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                      کد 6 رقمی به <span>{props.location.state.values.email}</span> ارسال شده است
                    </Typography>
                  </Grid>
                  <Grid item xs={12} component="form" sx={{ margin: '80px 10px 0 0' }} onSubmit={verify}>
                    <VerificationInput
                      ref={token}
                      removeDefaultStyles
                      dir="ltr"
                      classNames={{
                        container: 'container',
                        character: 'character',
                        characterInactive: 'character--inactive',
                        characterSelected: 'character--selected',
                      }}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 4 }}>
                      تایید
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                      ارسال دوباره کد بعد از <span>120</span> ثانیه
                      <Button disabled={resend} variant="contained" sx={{ m: 2 }} onClick={resend_code}>
                        ارسال
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <img src={image2} alt="" className="responsive" />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default EmailVerification;
