// IMPORTING APIS
import React from 'react';
import './style.scss';
import logo from '../../assets/logo.png';

import { AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide } from '@mui/material';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
const DesktopNavbar = props => {
  return (
    <AppBar style={{ backgroundColor: '#fff' }}>
      <Toolbar>
        <img alt="لوگوی کوله‌پشتی " style={{ marginRight: '50px' }} src={logo} width="75" />
        <Typography variant="h5" component="p" style={{ fontWeight: 800, color: '#000' }}>
          کوله‌پشتی
        </Typography>

        <div style={{ marginRight: '2rem' }}>
          <Button variant="text" component={Link} to="/singup" style={{ color: '#000' }}>
            <SchoolIcon style={{ color: '#fd576c' }} />
            تدریس کن
          </Button>
          <Button variant="text" component={Link} to="/Help" style={{ color: '#000' }}>
            <HelpIcon style={{ color: '#fd576c' }} />
            راهنما
          </Button>
        </div>

        <div style={{ marginRight: 'auto', marginLeft: '10%' }}>
          {/* <SearchIcon/> */}
          <Button
            variant="contained"
            component={Link}
            to="/singup"
            style={{ backgroundColor: '#fd576c', marginLeft: '10px', fontWeight: 800 }}
          >
            ثبت نام
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            style={{ color: '#fd576c', border: '2px solid #fd576c', backgroundColor: '#fff', fontWeight: 800 }}
          >
            ورود
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopNavbar;
