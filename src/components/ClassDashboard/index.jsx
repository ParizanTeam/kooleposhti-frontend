import React, { Fragment, useState, useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ClassDiscounts from '../ClassDiscounts';
import CreateDiscount from '../ClassDiscounts/CreateDiscount';
import MenuIcon from '@mui/icons-material/Menu';
import Assignments from '../Assignments';
import CreateAssignment from '../CreateAssignment';
import { toast, ToastContainer } from 'react-toastify';
import { Modal, Fade, Backdrop } from '@mui/material';
import CourseLoader from '../CourseLoader';
import ClassStudentsInfo from '../ClassStudentsInfo';
import ClassGeneralInfo from '../ClassGeneralInfo';
import Navbar from '../Navbar';
import Footer from '../Footer';

import AssignmentsView from '../AssignmentsView';
import StudentAssignments from '../StudentAssignments';
import BaseAssignments from '../BaseAssignments';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';
import patternSrc from '../../assets/images/pattern2.png';
import './style.scss';
import { Link, NavLink, Redirect, Route, useHistory, useLocation, useParams } from 'react-router-dom';
import EditAssignment from '../EditAssignment';

import apiInstance from '../../utils/axiosConfig';
import ClassAtendees from '../ClassAtendees';
import { baseUrl } from '../../utils/constants';
import ReactLoading from 'react-loading';

const ClassDashboard = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [info, setInfo] = useState(null);
  const params = useParams();
  const location = useLocation();
  const classId = params.classId;
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [leaveClassLoading, setLeaveClassLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [apiLoading, setApiLoading] = useState(role ? false : true);

  useEffect(() => {
    setApiLoading(true);
    apiInstance
      .get(`${baseUrl}/courses/${classId}/role/`)
      .then(res => {
        console.log(res.data);
        setRole(res.data.role);
        setApiLoading(false);
      })
      .catch(err => {
        setRole('anonymous');
      });
  }, [role]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const leaveClass = () => {
    setLeaveClassLoading(true);
    apiInstance
      .post(`${baseUrl}/courses/${classId}/leave/`)
      .then(res => {
        console.log(res);
        toast.success('???? ???????????? ???? ???????? ???????? ????????.');
        setTimeout(() => {
          history.push(`/courses/${classId}`);
        }, 2000);
        setLeaveClassLoading(false);
      })
      .catch(err => {
        console.log(err);
        toast.error('?????????? ???? ???????????? ???? ???????? ??????????.');
        setLeaveClassLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  useEffect(() => {
    apiInstance.get(`${baseUrl}/courses/${classId}/`).then(res => {
      setInfo(res.data);
    });
  }, []);

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
          <NavLink
            exact
            activeClassName="active-class-drawer-item"
            onClick={() => setShowDrawer(false)}
            to={`/dashboard/class/${classId}/`}
          >
            <div className={baseClass + '__item'}>
              <p>?????????????? ?????? ????????</p>
              <DashboardIcon />
            </div>
          </NavLink>

          <NavLink
            activeClassName="active-class-drawer-item"
            onClick={() => setShowDrawer(false)}
            to={`/dashboard/class/${classId}/assignments`}
          >
            <div className={baseClass + '__item'}>
              <p>?????????????????</p>
              <MenuBookIcon />
            </div>
          </NavLink>

          <Link to={`/courses/${classId}`}>
            <div className={baseClass + '__item'}>
              <p>???????? ?????????? ??????</p>
              <RemoveRedEyeIcon />
            </div>
          </Link>
          <NavLink
            activeClassName="active-class-drawer-item"
            onClick={() => setShowDrawer(false)}
            to={`/dashboard/class/${classId}/attendees`}
          >
            <div className={baseClass + '__item'}>
              <p>????????????????????????? ????????</p>
              <GroupsIcon />
            </div>
          </NavLink>
          {role == 'teacher' && (
            <NavLink
              activeClassName="active-class-drawer-item"
              onClick={() => setShowDrawer(false)}
              to={`/dashboard/class/${classId}/discounts`}
            >
              <div className={baseClass + '__item'}>
                <p>?????????? ????</p>
                <LocalOfferIcon />
              </div>
            </NavLink>
          )}
          {role == 'student' && (
            <div
              style={{ color: '#f22613', cursor: 'pointer' }}
              onClick={() => setOpenModal(true)}
              className={baseClass + '__item'}
            >
              <p>?????? ????????</p>
              <ExitToAppIcon />
            </div>
          )}
        </div>
        <div className={baseClass + '__box-1'}></div>
      </div>
    );
  };
  const isMobileOrTablet = useMediaQuery('(max-width: 768px)');
  return (
    <Fragment>
      {apiLoading && <CourseLoader />}
      {!apiLoading && (
        <Fragment>
          {role == 'anonymous' && <Redirect to="/not-found" />}
          <div style={{ marginBottom: 64 }}>
            <Navbar color="#fd576c" />
          </div>

          <div className="class-dashboard">
            {renderDrawer(false, role)}
            <div className="main-content">
              {/* <div className="class-navbar"> */}
              {isMobileOrTablet && (
                <Fragment>
                  <IconButton className="class-navbar__menu" onClick={toggleDrawer(true)}>
                    <MenuIcon fontSize="large" />
                  </IconButton>
                  <Drawer anchor="right" open={showDrawer} onClose={toggleDrawer(false)}>
                    {renderDrawer(true, role)}
                  </Drawer>
                </Fragment>
              )}
              {/* </div> */}
              <Route path="/dashboard/class/:classId" exact>
                {info && <ClassGeneralInfo role={role} info={info} />}
              </Route>
              <Route path="/dashboard/class/:classId/assignments" exact>
                <Assignments role={role} />
              </Route>
              <Route path="/dashboard/class/:classId/assignments/create" exact>
                {role != 'teacher' ? <Redirect to="/not-found" /> : <CreateAssignment role={role} />}
              </Route>
              <Route path="/dashboard/class/:classId/assignments/:assignmentId/edit" exact>
                {role != 'teacher' ? <Redirect to="/not-found" /> : <EditAssignment role={role} />}
              </Route>
              <Route path="/dashboard/class/:classId/assignments/:assignmentId/homeworks" exact>
                {role != 'teacher' ? <Redirect to="/not-found" /> : <AssignmentsView role={role} />}
              </Route>
              <Route path="/dashboard/class/:classId/assignments/view/:assignmentId" exact>
                <BaseAssignments role={role} />
              </Route>
              <Route path="/dashboard/class/:classId/discounts" exact>
                {role != 'teacher' ? <Redirect to="/not-found" /> : <ClassDiscounts />}
              </Route>
              <Route path="/dashboard/class/:classId/discounts/create" exact>
                {role != 'teacher' ? <Redirect to="/not-found" /> : <CreateDiscount role={role} />}
              </Route>
              <Route path="/dashboard/class/:classId/attendees" exact>
                {role == 'teacher' ? <ClassStudentsInfo /> : <ClassAtendees role={role} />}
                {/* <ClassAtendees role={role} /> */}
              </Route>
            </div>
          </div>
          <ToastContainer rtl={true} position="bottom-center" />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <div className="register-modal">
                <h4 className="register-modal__title">?????? ???? ?????? ?????? ???????? ?????????? ????????????</h4>
                <p className="register-modal__description">???? ???????? ?????? ?????????? ?????????? ???????? ???? ?????? ?????????????????? ???????????????.</p>
                <button className="register-modal__confirm" onClick={handleClose}>
                  ????????????
                </button>
                <button className="register-modal__cancel" onClick={leaveClass}>
                  ?????? ????????
                </button>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {leaveClassLoading && <ReactLoading type="bubbles" color="#000" />}
                </div>
              </div>
            </Fade>
          </Modal>
          <div style={{ marginTop: 8 }}>
            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ClassDashboard;
