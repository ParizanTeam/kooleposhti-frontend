import React from 'react';
import BaseDashboard from '../BaseDashboard';
import { Grid, ListItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Apple';
import LoginIcon from '@mui/icons-material/AccountBalance';
import SignupIcon from '@mui/icons-material/AccountCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Box } from '@mui/system';
import './style.scss';

function TeacherDashboard(props) {
  let history = useHistory();
  let notValidPath = false;

  const tabs = ['profile', 'wallet', 'classes'];

  const items = [
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[0]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[1]}`);
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[2]}`);
      },
    },
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[0]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[1]}`);
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[2]}`);
      },
    },
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[0]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[1]}`);
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[2]}`);
      },
    },
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[0]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[1]}`);
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push(`/dashboard/${tabs[2]}`);
      },
    },
  ];

  const profile = (
    <Box className="dashboard-sidebar-profile">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12}>
          <SignupIcon sx={{ fontSize: 100 }} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ListItem button className="dashboard-avatar-item">
            <p className="dashboard-avatar-item__info-name">سید عماد موسوی</p>
          </ListItem>
          <ListItem button className="dashboard-avatar-item">
            <p className="dashboard-avatar-item__info-edit">ویرایش حساب کاربری</p>
          </ListItem>
          <ListItem button className="dashboard-avatar-item">
            <p className="dashboard-avatar-item__info-edit"> ویرایش اطلاعات کاربری</p>
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  );

  const location = useLocation();
  console.log(tabs.map(item => `dashboard/${item}`));
  if (!tabs.map(item => `/dashboard/${item}`).includes(location.pathname)) {
    notValidPath = true;
  }

  return (
    <React.Fragment>
      {notValidPath && <Redirect to="/notFound" />}
      {location.pathname === '/dashboard/profile' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <h1>پروفایل</h1>
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/wallet' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <h1>کیف پول</h1>
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/classes' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <h1>کلاس ها</h1>
        </BaseDashboard>
      )}

      <BaseDashboard items={items} profile={profile} className="drawer">
        {props.children}
      </BaseDashboard>
    </React.Fragment>
  );
}

export default TeacherDashboard;
