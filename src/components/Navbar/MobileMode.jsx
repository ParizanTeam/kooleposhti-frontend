import * as React from 'react';
import Logo from './Logo';

import { styled } from '@mui/material/styles';
import { Drawer, Toolbar, Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchBar from './SearchBar';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Logout from '@mui/icons-material/Logout';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CalendarToday from '@mui/icons-material/CalendarToday';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
//New Imports
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

import { LoginSignUp, MenuButton } from './base';
import {navbarProps} from './constants'

const drawerWidth = 240;
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

const ProfileMenu = () => {
  const username = useSelector(state => state.auth.username);

  return (
    <>
      <MenuItem>
        <Avatar sx={{ width: 30, height: 30, ml: '15px' }} />
        {username}
      </MenuItem>
      <Divider />
      <MenuButton Icon={FavoriteBorder} text="علاقمندی‌هام" linkTo="/students/" />
      <MenuButton Icon={CalendarToday} text="برنامه کلاس‌هام" linkTo="/students/" />
      <MenuButton Icon={ForumOutlinedIcon} text="گفت‌و‌گو ها" linkTo="/students/" />
      <Divider style={{ marginTop: '20 px' }} />
      <MenuButton Icon={HelpIcon} text="راهنما" linkTo="/help" />
      <MenuButton Icon={Logout} text="خروج" linkTo="/logout" />
      <Divider />
    </>
  );
};

const MobileNavbar=() =>{
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState(navbarProps.baseColor);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
    <>
      <AppBar style={{ backgroundColor: '#fff' }} open={open}>
        <Toolbar>
          <Logo />
          <div style={{ marginRight: 'auto' }}>
            {!open && (
              <>
                <IconButton onClick={handleSearchBarOpen} sx={{ color: navbarProps.baseColor }}>
                  <SearchIcon />
                </IconButton>
                {isAuth && (
                  <Button variant="text" style={{ color: '#000' }}>
                    <NotificationsNoneIcon style={{ color: navbarProps.baseColor, marginRight: '5px', fontSize: '30' }} />
                  </Button>
                )}
              </>
            )}
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ color: navbarProps.baseColor, mr: 2, ...(open && { display: 'none' }) }}
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
        variant="temporary"
        onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: navbarProps.baseColor }}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {!isAuth && (
          <>
            <MenuButton Icon={SchoolIcon} text="تدریس کن" linkTo="/signup" />
            <MenuButton Icon={HelpIcon} text="راهنما" linkTo="/help" />
            <Divider style={{ marginTop: '20 px' }} />
          </>
        )}

        {isAuth ? <ProfileMenu /> : <LoginSignUp />}
      </Drawer>

      {openSearchBar && <SearchBar onClose={handleSearchBarClose} />}
    </>
  );
}

export default MobileNavbar;
