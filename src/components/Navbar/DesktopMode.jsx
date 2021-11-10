// IMPORTING APIS
import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import './style.scss';
import Logo from './Logo';
import SearchBar from './SearchBar';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';

//Redux
import { useSelector } from 'react-redux';


import {LoginSignUp,ProfileMenu,RightBtn} from './base'

import {navbarProps} from './constants'

const DesktopNavbar = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const [color, setColor] = React.useState(navbarProps.baseColor);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const handleSearchBarOpen = () => {
    setOpenSearchBar(true);
    setColor('grey');
  };

  const handleSearchBarClose = () => {
    setOpenSearchBar(false);
    setColor(navbarProps.baseColor);
  };

  return (
    <div>
      <AppBar style={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <Logo />
          <div style={{ marginRight: '2rem' }}>
            {isAuth ? (
              <RightBtn Icon={SchoolIcon} text="کلاس‌های من" linkTo="/classes" />
            ) : (
              <RightBtn Icon={SchoolIcon} text="تدریس کن" linkTo="/signup" />
            )}

            <RightBtn Icon={HelpIcon} text="راهنما" linkTo="/help" />
            <IconButton style={{ marginRight: '10px', color: color }} onClick={handleSearchBarOpen}>
              <SearchIcon />
            </IconButton>
          </div>
          {isAuth ? <ProfileMenu /> : <LoginSignUp />}
        </Toolbar>
      </AppBar>

      {openSearchBar && <SearchBar onClose={handleSearchBarClose} />}
    </div>
  );
};

export default DesktopNavbar;
