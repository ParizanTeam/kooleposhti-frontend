import React, { useState, useEffect, useRef } from 'react';
import SignupIcon from '@mui/icons-material/AccountCircle';
import { Button, Grid, Box, Typography, Container, Avatar, Rating, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import FormData from 'form-data';
import { Formik } from 'formik';
import ReactLoading from 'react-loading';
import axios from '../../utils/axiosConfig';
import JoditEditor from 'jodit-react';
import back_profile1 from '../../assets/images/back_profile2.jpg';
import back_profile2 from '../../assets/images/back_profile3.jpg';
import profile_1 from '../../assets/images/profile_2.png';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import CourseCard from '../CourseCard';
import { useMobile } from '../../utils/detectSource';
import { coursesData } from './coursesData.js';
import 'swiper/swiper-bundle.min.css';
import { baseUrl } from '../../utils/constants';
import image from '../../assets/images/banner.png';
import ReactHtmlParser from 'react-html-parser';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import classImg from '../../assets/images/assignment.png';
import './style.scss';

function TeacherPublicProfile(props) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const teacher_username = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const token = 'JWT ' + localStorage.getItem('access_token');
  const [teacherData, setTeacherData] = useState({
    bio: '',
    courses: [{ id: 2, title: '', teacherName: '', teacherImgSrc: '#', imgSrc: '#', rate: 0 }],
    first_name: '',
    last_name: '',
    rate: 0,
    username: '',
    image: {},
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  useEffect(() => {
    function fetchData() {
      if (teacher_username === 'public-profile') {
        const res = axios
          .get(`${baseUrl}/accounts/profile/update-profile/`, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            setTeacherData(response.data.data);
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
          });
      } else {
        const res = axios
          .get(`${baseUrl}/accounts/profile/public/${teacher_username}`, {
            headers: {
              // Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            setTeacherData(response.data.data);
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
          });
      }
    }
    fetchData();
  }, []);

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const breakpoint1 = useMediaQuery('(max-width: 1000px)');
  const breakpoint2 = useMediaQuery('(max-width: 1400px)');
  const breakpoint3 = useMediaQuery('(max-width: 600px)');

  const [value, setValue] = React.useState(3);

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  const teacher_profile1 = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={breakpoint3 ? back_profile1 : back_profile2}
        alt="teacher_profile"
        className="image"
        style={{ minWidth: '320px', maxWidth: '1000px' }}
      />
      <Grid sx={{ position: 'absolute', marginTop: { sm: '1%' } }}>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={teacherData.image ? teacherData.image.image : profile_1}
            alt="profile"
            sx={{
              width: {
                lg: breakpoint2 ? '15vmin' : '23vmin',
                md: breakpoint1 ? '9vmin' : '10vmin',
                sm: '10vmin',
                xs: '20vmin',
              },
              height: {
                lg: breakpoint2 ? '15vmin' : '23vmin',
                md: breakpoint1 ? '9vmin' : '10vmin',
                sm: '10vmin',
                xs: '20vmin',
              },
              borderRadius: '50%',
              mt: { lg: '12vmin', md: '8vmin', sm: '6vmin', xs: '20vmin' },
              border: 'rgb(10,90,137) solid 3px',
            }}
          />
          <Typography
            variant="body3"
            sx={{
              mt: { md: '2vmin', sm: '1.5vmin', xs: '2vmin' },
              fontStyle: 'italic',
              fontSize: { lg: '1.5rem', sm: '1.5vmin', xs: '1.6vmax' },
              width: '20vmax',
              textAlign: 'center',
              color: 'rgb(5,105,169) !important',
            }}
          >
            {teacherData.username}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: '1vmin',
              fontSize: { lg: '1.1rem', sm: '1.2vmin', xs: '1.3vmax' },
              width: '20vmax',
              textAlign: 'center',
              color: 'rgb(0,155,160) !important',
            }}
          >
            {teacherData.first_name && teacherData.last_name
              ? teacherData.first_name + ' ' + teacherData.last_name
              : null}
          </Typography>
          <div dir='ltr' className="course-card__rating-wrapper">
            <Rating
              name="simple-controlled"
              readOnly
              precision={0.5}
              value={teacherData.rate}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ mt: '1vmin' }}
              size={useMediaQuery('(max-width: 1100px)') ? 'small' : 'large'}
              /* IconContainerComponent={IconContainer} */
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );

  const teacher_profile2 = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={back_profile2} alt="sky" className="image" />
      <Avatar
        src={profile_1}
        alt="profile"
        sx={{
          mt: 1,
          width: { lg: '16vmin', sm: '10vmin' },
          height: { lg: '16vmin', sm: '10vmin' },
          borderRadius: '50%',
          position: 'absolute',
          marginTop: '-10%',
          marginRight: { lg: '20%', sm: '25%' },
        }}
      />
    </div>
  );
  const use_mobile = useMobile();

  /*  SwiperCore.use([Navigation, Keyboard]); */
  const TeacherClasses = () => {
    return (
      <div className="My-courses-section">
        <h2 className="My-courses-section__title">???????? ???????????????</h2>
        <div className="My-carousal-container">
          <Grid sx={{ width: { xl: '100%', md: '85%', sm: '65vmin', xs: '90vmin' } }}>
            {teacherData.courses.length === 0 && (
              <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ margin: 'auto' }}>
                <Avatar
                  src={classImg}
                  alt="class list"
                  sx={{
                    width: { md: '20vw', sm: '40vw', xs: '50vw' },
                    height: { md: '20vw', sm: '40vw', xs: '50vw' },
                    borderRadius: '0',
                  }}
                />
                <p className="teacher-classes-emptylist">?????????? ???????? ?????????? ???????? ?????????? !!!</p>
              </Grid>
            )}

            {teacherData.courses.length !== 0 && (
              <Swiper
                style={{ padding: 20 }}
                spaceBetween={10}
                slidesPerView={'auto'}
                navigation={use_mobile || teacherData.courses.length <= 1 ? false : true}
                keyboard
              >
                {teacherData.courses.map(item => (
                  <SwiperSlide key={item.id}>
                    <Link to={`/courses/${item.id}`}>
                      <CourseCard
                        id={item.id}
                        title={item.title === undefined ? 'title' : item.title}
                        teacherName={
                          item.teacherName === undefined
                            ? teacherData.first_name + ' ' + teacherData.last_name
                            : item.teacherName
                        }
                        rate={item.rate === undefined ? 2 : item.rate}
                        teacherImgSrc={teacherData.image === null ? profile_1 : teacherData.image.image}
                        imgSrc={
                          item.image === null
                            ? 'https://www.inklyo.com/wp-content/uploads/How-to-Succeed-in-an-Online-Course.jpg'
                            : item.image
                        }
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>?????????????? ?????????? ????????</title>
      </Helmet>
      {teacher_username !== 'public-profile' && (
        <div style={{ marginBottom: 72 }}>
          <Navbar color="#fd576c" />
        </div>
      )}

      {/* {teacher_username == 'public-profile' ? } */}
      <Box className="teacher-public-profile">
        {loading && (
          <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
              <ReactLoading type="spinningBubbles" color="rgb(42, 105, 129)" height={100} width={100} />
            </Grid>
          </Grid>
        )}
        {!loading && (
          <div>
            <div>{teacher_profile1}</div>
            <Grid
              container
              sx={{
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h4">???????????? ????</Typography>
              </Grid>
              <Grid item xs={12} maxWidth="68%" sx={{ mt: 5 }} minWidth="68%">
                <div className="abut-me_wrapper">
                  <Typography variant="body" className="about-me">
                    {(!teacherData.bio || teacherData.bio === '<p></p>') && (
                      <p className="teacher-public-profile-about-me__text">???????? ???????? ?????????? ???????? ?????????? !!!</p>
                    )}
                    {teacherData.bio && teacherData.bio !== '' && ReactHtmlParser(teacherData.bio)}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sx={{ mt: -30 }}>
                <div className="afterMyC-a">
                  <TeacherClasses />
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </Box>
      {teacher_username !== 'public-profile' && <Footer />}
    </>
  );
}

export default TeacherPublicProfile;
