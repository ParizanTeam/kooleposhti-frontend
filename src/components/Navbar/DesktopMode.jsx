// IMPORTING APIS
import React from 'react';
import { AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import './style.scss';
import logo from '../../assets/logo.png';
import SearchBar from './SearchBar';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';

const DesktopNavbar = props => {
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const handleSearchBarOpen = () => {
    setOpenSearchBar(true);
  };

  const handleSearchBarClose = () => {
     setOpenSearchBar(false);
  };

  return (
    <div>
      <AppBar style={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <img alt="لوگوی کوله‌پشتی " style={{ marginRight: '50px' }} src={logo} width="75" />
          <Typography variant="h5" component="p" style={{ fontWeight: 800, color: '#000' }}>
            کوله‌پشتی
          </Typography>

          <div style={{ marginRight: '2rem' }}>
            <Button variant="text" component={Link} to="/singup" style={{ color: '#000' }}>
              <SchoolIcon style={{ color: '#fd576c', marginLeft: '5px' }} />
              تدریس کن
            </Button>
            <Button variant="text" component={Link} to="/Help" style={{ color: '#000' }}>
              <HelpIcon style={{ color: '#fd576c', marginLeft: '5px' }} />
              راهنما
            </Button>

            <IconButton style={{ marginRight: '10px' }} onClick={handleSearchBarOpen}>
              <SearchIcon />
            </IconButton>
          </div>

          <div style={{ marginRight: 'auto', marginLeft: '10%' }}>
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

      {openSearchBar && <SearchBar onClose={handleSearchBarClose} />}

    </div>
  );
};

export default DesktopNavbar;
