import React, { Fragment, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';
import patternSrc from '../../assets/images/pattern2.png';
import './style.scss';

const ClassDashboard = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowDrawer(open);
  };

  const renderDrawer = isMobile => {
    const baseClass = isMobile ? 'class-drawer-mobile' : 'class-drawer';
    return (
      <div className={`${baseClass}`}>
        <img className={baseClass + '__img-top'} src={patternSrc} alt="" />
        <img className={baseClass + '__img-bottom'} src={patternSrc} alt="" />
        <div className={baseClass + '__box-1'}></div>
        <div className={baseClass + '__items-container'}>
          <div className={baseClass + '__item'}>
            <p>اطلاعات کلی کلاس</p>
            <DashboardIcon />
          </div>
          <div className={baseClass + '__item'}>
            <p>چت با استاد</p>
            <ChatIcon />
          </div>
          <div className={baseClass + '__item'}>
            <p>گفتگوی گروهی</p>
            <PeopleIcon />
          </div>
          <div className={baseClass + '__item'}>
            <p>تمرین‌ها</p>
            <MenuBookIcon />
          </div>
          <div className={baseClass + '__item'}>
            <p>بازخوردها</p>
            <FeedbackIcon />
          </div>
          <div className={baseClass + '__item'}>
            <p>صفحه درس</p>
            <RemoveRedEyeIcon />
          </div>
        </div>
        <div className={baseClass + '__box-1'}></div>
      </div>
    );
  };
  return (
    <Fragment>
      <div className="class-navbar">
        {useMediaQuery('(max-width: 768px)') && (
          <Fragment>
            <IconButton className="class-navbar__menu" onClick={toggleDrawer(true)}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer anchor="right" open={showDrawer} onClose={toggleDrawer(false)}>
              {renderDrawer(true)}
            </Drawer>
          </Fragment>
        )}
      </div>
      <div className="class-dashboard">
        {renderDrawer(false)}
        <div className="main-content">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, unde autem sint, eaque pariatur reiciendis suscipit obcaecati laborum cupiditate dolore nostrum perferendis praesentium ut iure quia inventore natus quo cumque.</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ClassDashboard;
