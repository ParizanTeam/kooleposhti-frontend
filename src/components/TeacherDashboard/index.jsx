import React, { useState } from 'react';
import BaseDashboard from '../BaseDashboard';
import { Grid, ListItem, Avatar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Apple';
import LoginIcon from '@mui/icons-material/AccountBalance';
import SignupIcon from '@mui/icons-material/AccountCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import DashboardTeacherProfile from '../DashboardTeacherProfile';
import DashboardTeacherClasses from '../DashboardteacherClasses';
import DashboardTeacherWallet from '../DashboardTeacherWallet';
import DashboardTeacherRecieved from '../DashboardTeacherRecieved';
import DashboardTeacherBankAccount from '../DashboardTeacherBankAccount';
import profile_1 from '../../assets/images/profile_1.png';
import './style.scss';

function TeacherDashboard(props) {
  let history = useHistory();
  let notValidPath = false;

  const [file, setFile] = useState(profile_1);

  const tabs = ['profile', 'classes', 'wallet', 'received', 'bankaccount'];

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

  const profile = (
    <Box className="dashboard-sidebar-profile">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} sx={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
            <Avatar src={file} alt="profile" sx={{ height: 'auto', width: '30%', borderRadius: '50%' }} />
        </Grid>

        <Grid item xs={12} sm={12}>
          <ListItem button className="dashboard-avatar-item">
            <p className="dashboard-avatar-item__info-name">سید عماد موسوی</p>
          </ListItem>
          <ListItem button className="dashboard-avatar-item">
            <Link to={`/teacher/dashboard/${tabs[0]}`}>
              <p className="dashboard-avatar-item__info-edit">ویرایش حساب کاربری</p>
            </Link>
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  );

  const location = useLocation();

  if (!tabs.map(item => `/teacher/dashboard/${item}`).includes(location.pathname)) {
    notValidPath = true;
  }

  return (
    <React.Fragment>
      {notValidPath && <Redirect to="/notFound" />}
      {location.pathname === '/teacher/dashboard/profile' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherProfile />
        </BaseDashboard>
      )}
      {location.pathname === '/teacher/dashboard/wallet' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherWallet />
        </BaseDashboard>
      )}
      {location.pathname === '/teacher/dashboard/classes' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherClasses />
        </BaseDashboard>
      )}
      {location.pathname === '/teacher/dashboard/received' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherRecieved />
        </BaseDashboard>
      )}
      {location.pathname === '/teacher/dashboard/bankaccount' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherBankAccount />
        </BaseDashboard>
      )}

      <BaseDashboard items={items} profile={profile} className="drawer">
        {props.children}
      </BaseDashboard>
    </React.Fragment>
  );
}

export default TeacherDashboard;
