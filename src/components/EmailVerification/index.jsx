import React, { useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import VerificationInput from 'react-verification-input';
import image from '../../assets/images/email.png';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Redirect } from 'react-router';
import MyTimer from '../MyTimer';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';

function EmailVerification(props) {
  const token = useRef('');
  const [resend, setResend] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5); // 10 minutes timer

  const onExpire = newState => {
    setResend(newState);
  };

  const resend_code = event => {
    event.preventDefault();
    console.log('verified');
    setResend(false);
    const info = { email: props.location.state.values.email, username: props.location.state.values.username };

    axios
      .post('https://kooleposhti.herokuapp.com/accounts/activate/', info, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('status is: ', response.status);
        toast.success('کد تایید با موفقیت ارسال شد', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch(err => {
        console.log('error: ', err);
        toast.error('مشکلی در فرستادن کد پیش آمده لطفا دوباره امتحان کنید', {
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
  };
  const verifyAndSignUp = async event => {
    event.preventDefault();
    const info = { email: props.location.state.values.email ?? null, token: token.current.value ?? null };

    try {
      const res = await axios
        .post('https://kooleposhti.herokuapp.com/accounts/checkcode/', info, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('status is: ', response.status);
        })
        .catch(err => {
          throw 'checkcode';
        });

      const res2 = await axios
        .post('https://kooleposhti.herokuapp.com/accounts/signup/', JSON.stringify(props.location.state.values), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log('status is: ', res.status);
          toast.success('ثبت نام با موفقیت انجام شد', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });

          setTimeout(() => {
            setIsSignedUp(true);
          }, 3000);
        })
        .catch(err => {
          throw 'signup';
        });
    } catch (error) {
      if (error === 'checkcode') {
        toast.error('کد وارد شده اشتباه است', {
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
      if (error === 'signup') {
        toast.error('کاربر با این مشخصات قبلا ثبت نام شده است', {
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
                  <ToastContainer rtl={true} />
                  <Grid item xs={12}>
                    <Typography variant="h4" color="text.secondary" align="center">
                      لطفا کد تایید ایمیل رو وارد کن
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                      کد 6 رقمی به <span>{props.location.state.values.email}</span> ارسال شده‌است
                    </Typography>
                  </Grid>
                  <Grid item xs={12} component="form" sx={{ margin: '80px 10px 0 0' }} onSubmit={verifyAndSignUp}>
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
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 4, backgroundColor: 'rgb(99, 36, 200) !important' }}
                    >
                      تایید
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8 }}>
                      ارسال دوباره کد بعد از{' '}
                      <span>
                        <MyTimer expiryTimestamp={time} expire={onExpire} resend={resend} seconds={60} />
                      </span>{' '}
                      ثانیه
                      <Button
                        disabled={!resend}
                        variant="contained"
                        sx={{ m: 2 }}
                        onClick={resend_code}
                        className="resend-code"
                      >
                        ارسال
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <img src={image} alt="" className="responsive" />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default EmailVerification;
