import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import VerificationInput from 'react-verification-input';
import image from '../../assets/images/child1.jpg';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import './style.scss';

function EmailVerification(props) {
  const verify = event => {
    event.preventDefault();
    console.log('verified');
  };

  return (
    <div>
      <Container maxWidth="lg" component="main">
        <Box sx={{ mt: 12 }}>
          <Grid container spacing={1} align="center" justify="center" alignItems="center">
            <Grid item xs={12} sm={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h4" color="text.secondary" align="center">
                    لطفا کد تایید ایمیل را وارد کنید
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                    کد 6 رقمی به <span>emadmoosavi79@gmail.com</span> ارسال شده است
                  </Typography>
                </Grid>
                <Grid item xs={12} component="form" sx={{ margin: '80px 10px 0 0' }} onSubmit={verify}>
                  <VerificationInput dir="ltr" />
                  <Button type="submit" variant="contained" sx={{ mt: 4 }}>
                    تایید
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <img src={image} alt="" className="responsive" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default EmailVerification;
