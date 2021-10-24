import * as React from 'react';
import logo from '../../assets/logo.png';

import { styled, useTheme } from '@mui/material/styles';
import { Drawer, Toolbar, Typography, Button, useScrollTrigger, Slide } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MenuButton1 = ({ Icon, text, linkTo }) => {
  return (
    <div style={{ marginBottom: '5 px' }}>
      <Button style={{ marginRight: '10px' }} variant="text" component={Link} to={linkTo}>
        <Icon  color="primary" />
        <span style={{ marginRight: '5px' }}>{text}</span>
      </Button>
    </div>
  );
};



export default function MobileNavbar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div id="mobile">
      <AppBar color="transparent" style={{ backdropFilter: 'blur(10px)' }} open={open}>
        <Toolbar>
          <img alt="لوگوی کوله‌پشتی " src={logo} width="75" id="logo" />
          <Typography variant="h5" component="p" color="textSecondary">
            کوله‌پشتی
          </Typography>
          <div style={{ marginRight: 'auto' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider  />

        <MenuButton1 Icon={SchoolIcon} text="تدریس کن" linkTo="/singup" />
        <MenuButton1 Icon={HelpIcon} text="راهنما" linkTo="/help" />

        <Divider style={{ marginTop: '20 px' }} />

        <MenuButton1 Icon={AccountCircleIcon} text="ثبت نام" linkTo="/singup" />
        <MenuButton1 Icon={LoginIcon} text="ورود" linkTo="/login" />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </div>
  );
}
