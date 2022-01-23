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
import Assignment from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { convertNumberToPersian } from '../../utils/helpers';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions';

import { navbarProps } from './constants';
const LogoutBtn = () => {
  const dispatch = useDispatch();
  return useMobile ? (
    <div style={{ marginBottom: '5 px' }}>
      <Button
        component={Link}
        to="/"
        onClick={() => dispatch(logout())}
        style={{ color: '#000', width: '100%', justifyContent: 'flex-start', padding: '16px' }}
        variant="text"
      >
        <Logout style={{ color: navbarProps.baseColor }} />
        <span style={{ marginRight: '5px' }}>خروج</span>
      </Button>
    </div>
  ) : (
    <MenuItem component={Link} to="/" onClick={() => dispatch(logout())}>
      <ListItemIcon>
        <Logout style={{ color: navbarProps.baseColor }} fontSize="small" />
      </ListItemIcon>
      خروج
    </MenuItem>
  );
};
export const MyClasses = () => {
  return (
    <>
      <RightBtn Icon={CastForEducationIcon} text="همه کلاس‌ها" linkTo="/classes" />
    </>
  );
};
export const ProfileMenu = props => {
  const username = useSelector(state => state.auth.username);
  const profileImage = useSelector(state => state.auth.image);
  const editProfileStyle = { color: navbarProps.baseColor, fontSize: '12px', filter: 'brightness(70%)' };
  let role = useSelector(state => state.auth.roles)[0];
  if (role == 'instructor') role = 'teacher';
  const profileMenuItems = {
    student: [
      { icon: CastForEducationIcon, label: 'کلاس‌ها', to: '/dashboard/student/ClassesList' },
      { icon: Assignment, label: 'چالش‌ها', to: '/dashboard/student/assignments' },
      { icon: FavoriteBorder, label: 'علاقمندی‌ها', to: '/dashboard/student/bookmarks' },
      { icon: AttachMoneyIcon, label: 'سکه‌های من', to: '/dashboard/student/Coins' },
    ],
    teacher: [
      { icon: CastForEducationIcon, label: 'کلاس‌ها', to: '/dashboard/teacher/classes' },
      { icon: AccountBalanceIcon, label: 'کیف پول', to: '/dashboard/teacher/wallet' },
      { icon: AttachMoneyIcon, label: 'دریافت‌ها', to: '/dashboard/teacher/received' },
    ],
  };
  // /dashboard/student/Coins
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
            <Tooltip title="منوی شخصی">
              <IconButton onClick={handleClick} size="small">
                {profileImage ? (
                  <Avatar src={profileImage.image} sx={{ width: 45, height: 45 }} />
                ) : (
                  <Avatar sx={{ width: 32, height: 32 }}>{username[0].toUpperCase()}</Avatar>
                )}
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
            <MenuItem component={Link} to={`/dashboard/${role}/profile`}>
              <Avatar src={profileImage ? profileImage.image : ''} sx={{ width: 45, height: 45, ml: '15px' }} />
              <div>
                <p>{username}</p>
                <a style={editProfileStyle}>ویرایش پروفایل</a>
              </div>
            </MenuItem>
            <Divider />
            {profileMenuItems[role].map((item, i) => (
              <MenuItem key={i} component={Link} to={item.to}>
                <ListItemIcon>
                  <item.icon style={{ color: navbarProps.baseColor }} fontSize="small" />
                </ListItemIcon>
                {item.label}
              </MenuItem>
            ))}
            <LogoutBtn />
          </Menu>
        </>
      ) : (
        <>
          <MenuItem component={Link} to={`/dashboard/${role}/profile`}>
            <Avatar src={profileImage ? profileImage.image : ''} sx={{ width: 45, height: 45, ml: '15px' }} />
            <div>
              <p>{username}</p>
              <a style={editProfileStyle}>ویرایش پروفایل</a>
            </div>
          </MenuItem>
          <Divider />
          {profileMenuItems[role].map((item, i) => (
            <MenuButton Icon={item.icon} text={item.label} linkTo={item.to} />
          ))}
          <Divider style={{ marginTop: '20 px' }} />
          {/* <MenuButton Icon={HelpIcon} text="راهنما" linkTo="/help" /> */}
          <LogoutBtn />
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
