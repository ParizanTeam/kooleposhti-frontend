import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import HomeIcon from '@mui/icons-material/Apple';
import LoginIcon from '@mui/icons-material/AccountBalance';
import SignupIcon from '@mui/icons-material/AccountCircle';
import { useHistory, useLocation } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardTeacherProfile from './DashboardTeacherProfile';
import profile_1 from '../assets/images/profile_1.png';
import {
  CssBaseline,
  IconButton,
  Typography,
  ListItemIcon,
  ListItem,
  List,
  Toolbar,
  Box,
  Divider,
  Grid,
  useMediaQuery,
  Button,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { Link } from 'react-router-dom';
import { ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

const tabs = ['profile', 'classes', 'wallet', 'received', 'bankaccount'];

const drawerWidth = 310;

const cacheRtl = createCache({
  key: 'muirtl',

  stylisPlugins: [rtlPlugin],

  prepend: true,
});

const openedMixin = theme => ({
  width: drawerWidth,
  backgroundColor: 'rgba(10, 67, 94, 0.942)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: 'rgba(10, 67, 94, 0.942)',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
    backgroundColor: 'rgba(10, 67, 94, 0.942)',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: { md: drawerWidth, sm: '34vmin' },
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(10, 67, 94, 0.942)',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function MiniDrawer(props) {
  let history = useHistory();

  const items = [
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[1]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[2]}`);
      },
    },
    {
      text: 'دریافت ها',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[3]}`);
      },
    },
    {
      text: 'حساب بانکی',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[4]}`);
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[1]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[2]}`);
      },
    },
    {
      text: 'دریافت ها',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[3]}`);
      },
    },
    {
      text: 'حساب بانکی',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[4]}`);
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[1]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[2]}`);
      },
    },
    {
      text: 'دریافت ها',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[3]}`);
      },
    },
    {
      text: 'حساب بانکی',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/teacher/dashboard/${tabs[4]}`);
      },
    },
  ];

  const [file, setFile] = useState(profile_1);

  const profile = (
    <Box className="dashboard-sidebar-profile">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar src={file} alt="profile" sx={{ height: 'auto', width: '30%', borderRadius: '50%' }} />
        </Grid>

        <Grid item xs={12} sm={12}>
          <ListItem button className="dashboard-avatar-item">
            <p className="dashboard-avatar-item__info-name">سید عماد موسوی</p>
          </ListItem>
          <ListItem button className="dashboard-avatar-item">
            <Link to={`/teacher/dashboard/profile`}>
              <p className="dashboard-avatar-item__info-edit">ویرایش حساب کاربری</p>
            </Link>
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  );
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: 'rgba(10, 67, 94, 0.942)' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Button variant="text" component={Link} to="/singup" sx={{ mr: 2 }}>
              <SchoolIcon sx={{ color: 'rgba(123, 234, 242, 0.857)', mr: 1.5 }} />
              <Typography variant="body" noWrap component="div" sx={{ color: 'white', fontSize: '0.7rem' }}>
                تدریس کن
              </Typography>
            </Button>
            <Button variant="text" component={Link} to="/Help">
              <HelpIcon sx={{ color: 'rgba(123, 234, 242, 0.857)', mr: 1.5 }} />
              <Typography variant="body" noWrap component="div" sx={{ color: 'white', fontSize: '0.7rem' }}>
                راهنما
              </Typography>
            </Button>

            <Box display="flex" flexGrow={1} sx={{ direction: 'rtl' }}>
              <Button variant="text" component={Link} to="/Help">
                <LogoutIcon sx={{ color: 'rgba(123, 234, 242, 0.857)', ml: 1.5 }} />
                <Typography variant="body" noWrap component="div" sx={{ color: 'white', fontSize: '0.7rem' }}>
                  خروج
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Box>
              <Typography
                component="ListItem"
                className="dashboard-sidebar-profile-title"
                variant="h6"
                sx={{ fontWeight: 'bold' }}
              >
                <ListItem button className="list-item">
                  {open && (
                    <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                      <Typography sx={{ fontSize: { md: '1.3rem', sm: '2.5vmin' }, ml: { sm: 0, xs: '40px' } }}>
                        {' '}
                        کوله پشتی
                      </Typography>
                    </IconButton>
                  )}
                </ListItem>
              </Typography>
              {open && <Divider sx={{ background: 'rgba(255, 255, 255, 0.4);', mr: 2, ml: 2 }} />}
              <Toolbar>{open && profile}</Toolbar>
            </Box>
          </DrawerHeader>
          {open && <Divider sx={{ background: 'rgba(255, 255, 255, 0.4);', mr: 2, ml: 2 }} />}
          <List>
            {items.map((item, index) => (
              <div style={{ padding: '0px 10px' }}>
                <ListItem
                  button
                  key={item.text}
                  onClick={item.onClick}
                  className="list-item"
                  sx={{ color: 'white !important' }}
                >
                  <ListItemIcon sx={{ color: 'white !important' }}>{item.icon}</ListItemIcon>
                  <p style={{ fontSize: '13px' }}>{item.text}</p>
                </ListItem>
              </div>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <DashboardTeacherProfile />
        </Box>
      </Box>
    </CacheProvider>
  );
}

export default MiniDrawer;