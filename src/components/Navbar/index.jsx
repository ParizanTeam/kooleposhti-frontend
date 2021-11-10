// IMPORTING APIS
import React from 'react';
import { useMobile } from '../../utils/detectSource';
import './style.scss';
import { Grid } from '@mui/material';
import DesktopNavbar from './DesktopMode';
import MobileNavbar from './MobileMode';
import {setBaseColor} from './constants'
const Navbar = ({color}) => {
  setBaseColor(color);
  return <div className="Navbar">{useMobile() ? <MobileNavbar/> : <DesktopNavbar />}</div>;
};

export default Navbar;
