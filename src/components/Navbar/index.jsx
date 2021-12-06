// IMPORTING APIS
import React from 'react';
import { AppBar, Toolbar, Divider, Drawer, Button,IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

//Redux
import { useSelector } from 'react-redux';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

//Local
import { useMobile } from '../../utils/detectSource';
import './style.scss';
import Logo from './Logo';
import SearchBar from './SearchBar';
import {LoginSignUp,ProfileMenu,RightBtn,MenuButton,MyClasses} from './base'
import {navbarProps,setBaseColor} from './constants'



const Navbar = ({color}) => {
  setBaseColor(color);
  return <div className="Navbar">{useMobile() ? <MobileNavbar/> : <DesktopNavbar />}</div>;
};

export default Navbar;


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
              <MyClasses/>
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

const drawerWidth = 240;
const MobileAppBar = styled(MuiAppBar, {
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
      <MobileAppBar style={{ backgroundColor: '#fff' }} open={open}>
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
      </MobileAppBar>
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