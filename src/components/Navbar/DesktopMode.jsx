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
    <div id="desktop">
      <AppBar style={{backgroundColor:"white",backdropFilter: "blur(10px)"}} >
        <Toolbar>
          
            <img   alt="لوگوی کوله‌پشتی " style={{ marginRight: '50px' }} src={logo} width="75" id="logo"/>
            <Typography variant="h5" component="p" color="textSecondary">
              کوله‌پشتی
            </Typography>
          {
            <div style={{ marginRight: '2rem' }}>
              <Button variant="text" component={Link} to="/singup" color="success">
                <SchoolIcon />
                تدریس کن
              </Button>
              <Button variant="text" component={Link} to="/Help" color="success">
                <HelpIcon />
                راهنما
              </Button>
            </div>
          }
          {
            <div style={{ marginRight: 'auto', marginLeft: '10%' }}>
              {/* <SearchIcon/> */}
              <Button variant="contained" component={Link} to="/singup" color="success" style={{ marginLeft: '10px' }}>
                ثبت نام
              </Button>
              <Button variant="contained" component={Link} to="/login" color="success">
                ورود
              </Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default DesktopNavbar;
