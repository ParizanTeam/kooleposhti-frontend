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
        onClick={() => dispatch(logout())}
        style={{ color: '#000', width: '100%', justifyContent: 'flex-start', padding: '16px' }}
        variant="text"
      >
        <Logout style={{ color: navbarProps.baseColor }} />
        <span style={{ marginRight: '5px' }}>خروج</span>
      </Button>
    </div>
  ) : (
    <MenuItem onClick={() => dispatch(logout())}>
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
      <RightBtn Icon={SchoolIcon} text="کلاس‌های من" linkTo="/dashboard/student/Schedule" />
    </>
  );
};
export const ProfileMenu = props => {
  const username = useSelector(state => state.auth.username);
  let role = useSelector(state => state.auth.roles)[0];
  if (role == 'instructor') role = 'teacher';
  console.log('role: ', role);
  const profileMenuItems = {
    student: [
      { icon: FavoriteBorder, label: 'علاقمندی‌هام', to: '/dashboard/student/bookmarks' },
      { icon: CalendarToday, label: 'برنامه کلاس‌هام', to: '/dashboard/student/calendar' },
      { icon: ForumOutlinedIcon, label: 'گفت‌وگو ها', to: '#' },
    ],
    teacher: [
      { icon: CastForEducationIcon, label: 'کلاس ها', to: '/dashboard/teacher/classes' },
      { icon: AccountBalanceIcon, label: 'کیف پول', to: '/dashboard/teacher/wallet' },
      { icon: ForumOutlinedIcon, label: 'گفت‌وگو ها', to: '#' },
    ],
  };

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
              <Badge badgeContent={convertNumberToPersian(4)} style={{ color: navbarProps.baseColor }}>
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
            <MenuItem component={Link} to={`/dashboard/${role}/profile`}>
              <Avatar sx={{ width: 30, height: 30, ml: '15px' }} />
              {username}
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
          <MenuItem>
            <Avatar sx={{ width: 30, height: 30, ml: '15px' }} />
            {username}
          </MenuItem>
          <Divider />
          {profileMenuItems[role].map((item, i) => (
            <MenuButton Icon={item.icon} text={item.label} linkTo={item.to} />
          ))}
          <Divider style={{ marginTop: '20 px' }} />
          <MenuButton Icon={HelpIcon} text="راهنما" linkTo="/help" />
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
