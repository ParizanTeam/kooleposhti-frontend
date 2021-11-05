import React from 'react';
import BaseDashboard from '../BaseDashboard';
import { Grid, Typography, ListItem, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Apple';
import LoginIcon from '@mui/icons-material/AccountBalance';
import SignupIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { Box } from '@mui/system';

function TeacherDashboard(props) {
  let history = useHistory();

  const items = [
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push('/dashboard/profile');
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push('/dashboard/teacher');
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push('/dashboard/student');
      },
    },
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push('/dashboard/profile');
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push('/dashboard/teacher');
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push('/dashboard/student');
      },
    },
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push('/dashboard/profile');
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push('/dashboard/teacher');
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push('/dashboard/student');
      },
    },
    {
      text: 'پروفایل',
      icon: <HomeIcon />,
      onClick: () => {
        history.push('/dashboard/profile');
      },
    },
    {
      text: 'کیف پول',
      icon: <LoginIcon />,
      onClick: () => {
        history.push('/dashboard/teacher');
      },
    },
    {
      text: 'کلاس ها',
      icon: <SignupIcon />,
      onClick: () => {
        history.push('/dashboard/student');
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

  return (
    <React.Fragment>
      <BaseDashboard items={items} profile={profile} className="drawer">
        {props.children}
      </BaseDashboard>
    </React.Fragment>
  );
}

export default TeacherDashboard;
