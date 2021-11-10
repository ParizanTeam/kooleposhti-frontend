import { useMobile } from '../../utils/detectSource';
// IMPORTING APIS
import React from 'react';
import { AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import './style.scss';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';

// IMPORTING ICONS
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import Logout from '@mui/icons-material/Logout';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CalendarToday from '@mui/icons-material/CalendarToday';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

//Redux
import { useSelector } from 'react-redux';

import { navbarProps } from './constants';

export const MyClasses = () => {
  return <>
  <RightBtn Icon={SchoolIcon} text="کلاس‌های من" linkTo="/classes" />
  
  </>;
};
export const ProfileMenu = props => {
  const username = useSelector(state => state.auth.username);
  const profileMenuItems = [
    { icon: <FavoriteBorder style={{ color: navbarProps.baseColor }} fontSize="small" />, label: 'علاقمندی‌هام' },
    { icon: <CalendarToday style={{ color: navbarProps.baseColor }} fontSize="small" />, label: 'برنامه کلاس‌هام' },
    { icon: <ForumOutlinedIcon style={{ color: navbarProps.baseColor }} fontSize="small" />, label: 'گفت‌وگو ها' },

    { icon: <Logout style={{ color: navbarProps.baseColor }} fontSize="small" />, label: 'خروج' },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {!useMobile() ? (
        <>
          <Box
            sx={{
              mr: 'auto',
              ml: '100px',
            }}
          >
            <Button variant="text" style={{ color: '#000' }}>
              <Badge badgeContent={4} style={{ color: navbarProps.baseColor }}>
                <NotificationsNoneIcon style={{ color: navbarProps.baseColor, marginRight: '5px', fontSize: '30' }} />
              </Badge>
            </Button>
            <Tooltip title="منوی شخصی">
              <IconButton onClick={handleClick} size="small">
                <Avatar sx={{ width: 32, height: 32 }}>{username[0].toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            disableScrollLock={true}
          >
            <MenuItem>
              <Avatar component={Link} to="/dashboard/student/Profile" sx={{ width: 30, height: 30, ml: '15px' }} />
              {username}
            </MenuItem>
            <Divider />
            {profileMenuItems.map(item => (
              <MenuItem>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
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
      )}
    </>
  );
};

export const RightBtn = ({ Icon, text, linkTo }) => {
  return (
    <Button variant="text" component={Link} to={linkTo} style={{ color: '#000' }}>
      <Icon style={{ color: navbarProps.baseColor, marginLeft: '5px' }} />
      {text}
    </Button>
  );
};

export const MenuButton = ({ Icon, text, linkTo }) => {
  return (
    <div style={{ marginBottom: '5 px' }}>
      <Button
        style={{ color: '#000', width: '100%', justifyContent: 'flex-start', padding: '16px' }}
        variant="text"
        component={Link}
        to={linkTo}
      >
        <Icon style={{ color: navbarProps.baseColor }} />
        <span style={{ marginRight: '5px' }}>{text}</span>
      </Button>
    </div>
  );
};

export const LoginSignUp = () => {
  return (
    <>
      {!useMobile() ? (
        // Desktop
        <div className="desktop_navbar__signup">
          <Button
            variant="contained"
            component={Link}
            to="/signup"
            style={{ backgroundColor: navbarProps.baseColor, marginLeft: '10px', fontWeight: 800 }}
          >
            ثبت نام
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            style={{
              color: navbarProps.baseColor,
              border: `2px solid ${navbarProps.baseColor}`,
              backgroundColor: '#fff',
              fontWeight: 800,
            }}
          >
            ورود
          </Button>
        </div>
      ) : (
        // Mobile
        <>
          <MenuButton Icon={AccountCircleIcon} text="ثبت نام" linkTo="/signup" />
          <MenuButton Icon={LoginIcon} text="ورود" linkTo="/login" />
        </>
      )}
    </>
  );
};
