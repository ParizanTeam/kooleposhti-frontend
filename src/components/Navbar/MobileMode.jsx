// IMPORTING APIS
import React from 'react';
import './style.scss';

import { AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide } from '@mui/material';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from "../../assets/logo.png";


// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function MobileNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="mobile">
      <AppBar color="transparent">
        <Toolbar>
          <Typography variant="h5" component="p" color="textSecondary">
            کوله‌پشتی
          </Typography>
          <div style={{ marginRight: 'auto' }}>
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <DehazeIcon />
            </Button>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <SchoolIcon />
              تدریس کن
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HelpIcon />
              راهنما
            </MenuItem>
            <MenuItem onClick={handleClose}>ثبت نام</MenuItem>
            <MenuItem onClick={handleClose}>ورود</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
