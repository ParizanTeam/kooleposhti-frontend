import React, { useState, useEffect } from 'react';
import BaseDashboard from '../BaseDashboard';
import { Grid, ListItem, Avatar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Apple';
import BankAccount from '@mui/icons-material/AccountBalance';
import RecievedCash from '@mui/icons-material/AttachMoney';
import Wallet from '@mui/icons-material/AccountBalanceWallet';
import SignupIcon from '@mui/icons-material/AccountCircle';
import AboutMe from '@mui/icons-material/AccountBox';
import Classes from '@mui/icons-material/AutoStories';
import PublicProfile from '@mui/icons-material/Person';
import { useHistory, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import DashboardTeacherProfile from '../DashboardTeacherProfile';
import DashboardTeacherClasses from '../DashboardteacherClasses';
import DashboardTeacherWallet from '../DashboardTeacherWallet';
import DashboardTeacherRecieved from '../DashboardTeacherRecieved';
import DashboardTeacherBankAccount from '../DashboardTeacherBankAccount';
import DashboardTeacherAboutMe from '../DashboardTeacherAboutMe';
import TeacherPublicProfile from '../TeacherPublicProfile';
import profile_1 from '../../assets/images/profile_1.png';
import {baseUrl} from '../../utils/constants';
import axios from 'axios';
import './style.scss';

function TeacherDashboard(props) {
  const token = 'JWT ' + localStorage.getItem('access_token');
  const [profile_username, setProfileUserName] = useState('');
  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/accounts/instructors/me/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('get response: ', response);
          setProfileUserName(response.data.username);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
    fetchData();
  }, []);

  let history = useHistory();
  let notValidPath = false;

  const [file, setFile] = useState(profile_1);

  const tabs = ['profile', 'classes', 'wallet', 'received', 'bankaccount', 'about-me', 'public-profile'];

  const items = [
    {
      text: 'کلاس ها',
      icon: <Classes />,
      onClick: () => {
        history.push(`/dashboard/teacher/${tabs[1]}`);
      },
    },
    {
      text: 'کیف پول',
      icon: <Wallet />,
      onClick: () => {
        history.push(`/dashboard/teacher/${tabs[2]}`);
      },
    },
    {
      text: 'دریافت ها',
      icon: <RecievedCash />,
      onClick: () => {
        history.push(`/dashboard/teacher/${tabs[3]}`);
      },
    },
    {
      text: 'حساب بانکی',
      icon: <BankAccount />,
      onClick: () => {
        history.push(`/dashboard/teacher/${tabs[4]}`);
      },
    },
    {
      text: 'درباره من',
      icon: <AboutMe />,
      onClick: () => {
        history.push(`/dashboard/teacher/${tabs[5]}`);
      },
    },
    {
      text: 'پروفایل عمومی',
      icon: <PublicProfile />,
      onClick: () => {
        history.push(`/dashboard/teacher/${tabs[6]}`);
      },
    },
  ];

  const profile = (
    <Box className="dashboard-sidebar-profile">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar src={file} alt="profile" sx={{ height: 'auto', width: '30%', borderRadius: '50%' }} />
        </Grid>

        <Grid item xs={12} sm={12}>
          <ListItem button className="dashboard-avatar-item">
            <p className="dashboard-avatar-item__info-name">{profile_username}</p>
          </ListItem>
          <ListItem button className="dashboard-avatar-item">
            <Link to={`/dashboard/teacher/${tabs[0]}`}>
              <p className="dashboard-avatar-item__info-edit">ویرایش حساب کاربری</p>
            </Link>
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  );

  const location = useLocation();

  if (!tabs.map(item => `/dashboard/teacher/${item}`).includes(location.pathname)) {
    notValidPath = true;
  }

  return (
    <React.Fragment>
      {notValidPath && <Redirect to="/notFound" />}
      {location.pathname === '/dashboard/teacher/profile' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherProfile />
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/teacher/wallet' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherWallet />
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/teacher/classes' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherClasses />
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/teacher/received' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherRecieved />
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/teacher/bankaccount' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherBankAccount />
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/teacher/about-me' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <DashboardTeacherAboutMe />
        </BaseDashboard>
      )}
      {location.pathname === '/dashboard/teacher/public-profile' && (
        <BaseDashboard items={items} profile={profile} className="drawer">
          <TeacherPublicProfile />
        </BaseDashboard>
      )}

      <BaseDashboard items={items} profile={profile} className="drawer">
        {props.children}
      </BaseDashboard>
    </React.Fragment>
  );
}

export default TeacherDashboard;
