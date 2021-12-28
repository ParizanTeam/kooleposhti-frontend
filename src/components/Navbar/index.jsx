// IMPORTING APIS
import React from 'react';
import { AppBar, Toolbar, Divider, Drawer, Button, IconButton, Menu } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

//Redux
import { useSelector } from 'react-redux';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

//Local
import { useMobile } from '../../utils/detectSource';
import './style.scss';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { LoginSignUp, ProfileMenu, RightBtn, MenuButton, MyClasses } from './base';
import { navbarProps, setBaseColor } from './constants';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const Navbar = ({ color }) => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: color,
      },
    },
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
  });
  setBaseColor(color);
  return (
    <div className="Navbar">
      <ThemeProvider theme={customTheme}>{useMobile() ? <MobileNavbar /> : <DesktopNavbar />}</ThemeProvider>
    </div>
  );
};

const HelpMenu = ({ helpText, anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: '10px 10px 10px 20px',
            border: `2px solid ${navbarProps.baseColor}`,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              border: `2px solid ${navbarProps.baseColor}`,
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {helpText}
      </Menu>
    </div>
  );
};

export default Navbar;

const DesktopNavbar = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const [color, setColor] = React.useState(navbarProps.baseColor);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const [helpAnchor, setHelpAnchor] = React.useState(null);
  const handleHelpAnchorClick = event => {
    setHelpAnchor(event.currentTarget);
  };
  const handleHelpAnchorClose = () => {
    setHelpAnchor(null);
  };
  const handleSearchBarOpen = () => {
    setOpenSearchBar(true);
    setColor('grey');
  };

  const handleSearchBarClose = () => {
    setOpenSearchBar(false);
    setColor(navbarProps.baseColor);
  };

  const location = useLocation();

  return (
    <div>
      <AppBar style={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <Logo />
          <div style={{ marginRight: '2rem' }}>
            {isAuth ? <MyClasses /> : <RightBtn Icon={SchoolIcon} text="تدریس کن" linkTo="/signup" />}

            <Button variant="text" onClick={handleHelpAnchorClick} style={{ color: '#000' }}>
              <HelpIcon style={{ color: navbarProps.baseColor, marginLeft: '5px' }} />
              راهنما
            </Button>
            {location.pathname != '/classes' && (
              <IconButton
                style={{ marginRight: '10px', color: color == 'grey' ? color : navbarProps.baseColor }}
                onClick={handleSearchBarOpen}
              >
                <SearchIcon />
              </IconButton>
            )}
          </div>
          {isAuth ? <ProfileMenu /> : <LoginSignUp />}
        </Toolbar>
      </AppBar>

      <SearchBar onClose={handleSearchBarClose} open={openSearchBar} />

      <HelpMenu helpText="راهنمای صفحه" anchorEl={helpAnchor} handleClose={handleHelpAnchorClose} />
    </div>
  );
};

// const HelpText=() =>
// {
//   <Typography variant="h5">
//     آشنایی با صفحه:
//   </Typography>
// }

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

const MobileNavbar = () => {
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
  const location = useLocation();

  return (
    <div>
      <MobileAppBar style={{ backgroundColor: '#fff' }} open={open}>
        <Toolbar>
          <Logo />
          <div style={{ marginRight: 'auto' }}>
            {!open && !location.pathname === '/classes' && (
              <>
                <IconButton onClick={handleSearchBarOpen} sx={{ color: navbarProps.baseColor }}>
                  <SearchIcon />
                </IconButton>
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
            <Divider style={{ marginTop: '20 px' }} />
          </>
        )}

        {isAuth ? <ProfileMenu /> : <LoginSignUp />}
      </Drawer>

      <SearchBar onClose={handleSearchBarClose} open={openSearchBar} />
    </div>
  );
};
