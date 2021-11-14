


import logoPic from '../../assets/logo.png';
import {Typography } from '@mui/material';




export default function Logo() {
  return (
    <>
      <img alt="لوگوی کوله‌پشتی " className="desktop_navbar__logo" src={logoPic} width="75" />
      <Typography variant="h5" component="p" style={{ fontWeight: 800, color: '#000' }}>
        کوله‌پشتی
      </Typography>
    </>
  );
}
