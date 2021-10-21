// IMPORTING APIS
import React from 'react';
import './style.scss';

import { AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide } from '@mui/material';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import DesktopNavbar from './DesktopMode';
import MobileNavbar from './MobileMode';

const Navbar = props => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

export default Navbar;
