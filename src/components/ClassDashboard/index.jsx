import React, { Fragment, useState, useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import Assignments from '../Assignments';
import CreateAssignment from '../CreateAssignment';
import { ToastContainer } from 'react-toastify';

import AssigmentsPage from '../AssigmentsPage';
import StudentAssignments from '../StudentAssignments';
import BaseAssignments from '../BaseAssignments';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';
import patternSrc from '../../assets/images/pattern2.png';
import './style.scss';
import { Link, Route, useLocation, useParams } from 'react-router-dom';
import EditAssignment from '../EditAssignment';

const ClassDashboard = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const params = useParams();
  const location = useLocation();
  const classId = params.classId;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

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
          <Link to={`/dashboard/class/${classId}/assignments`}>
            <div className={baseClass + '__item'}>
              <p>تمرین‌ها</p>
              <MenuBookIcon />
            </div>
          </Link>
          <div className={baseClass + '__item'}>
            <p>بازخوردها</p>
            <FeedbackIcon />
          </div>
          <Link to={`/courses/${classId}`}>
            <div className={baseClass + '__item'}>
              <p>صفحه درس</p>
              <RemoveRedEyeIcon />
            </div>
          </Link>
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
          <Route path="/dashboard/class/:classId/assignments" exact>
            <Assignments />
          </Route>
          <Route path="/dashboard/class/:classId/assignments/create" exact>
            <CreateAssignment />
          </Route>
          <Route path="/dashboard/class/:classId/assignments/edit" exact>
            <EditAssignment />
          </Route>
          <Route path="/dashboard/class/:classId/assignments/homeworks" exact>
            <AssigmentsPage />
          </Route>
          <Route path="/dashboard/class/:classId/assignments/preview" exact>
            <BaseAssignments />
          </Route>
        </div>
      </div>
      <ToastContainer rtl={true} position="bottom-center" />
    </Fragment>
  );
};

export default ClassDashboard;
