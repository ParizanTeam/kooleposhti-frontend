// IMPORTING APIS
import React from 'react';
import { useMobile } from '../../utils/detectSource';
import './style.scss';

import DesktopNavbar from './DesktopMode';
import MobileNavbar from './MobileMode';

const Navbar = props => {
  return <div className="Navbar">{useMobile() ? <MobileNavbar /> : <DesktopNavbar />}</div>;
};

export default Navbar;
