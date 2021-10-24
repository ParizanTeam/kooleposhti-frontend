// IMPORTING APIS
import React from 'react';
import './style.scss';

import DesktopNavbar from './DesktopMode';
import MobileNavbar from './MobileMode';


const Navbar = props => {
  return (
    <div className="Navbar">
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
};

export default Navbar;
