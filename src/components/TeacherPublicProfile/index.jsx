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
import './style.scss';

function TeacherPublicProfile(props) {
  const [loading, setLoading] = useState(true);
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
    function fetchData() {
      const res = axios
        .get(`${baseUrl}/accounts/profile/update-profile/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response.data.data);
          setTeacherData(response.data.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
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
            {teacherData.first_name + ' ' + teacherData.last_name}
          </Typography>
          <Rating
            name="simple-controlled"
            readOnly
            precision={0.5}
            value={teacherData.rate === null ? 3 : teacherData.rate}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            dir="rtl"
            sx={{ mt: '1vmin' }}
            size={useMediaQuery('(max-width: 1100px)') ? 'small' : 'large'}
            /* IconContainerComponent={IconContainer} */
          />
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
        <h2 className="My-courses-section__title">لیست کلاس ها</h2>
        <div className="My-carousal-container">
          <Grid sx={{ width: {xl:"100%", md: '85%', sm:"65vmin", xs: '90vmin' } }}>
          {teacherData.courses.length === 0 && <p className='teacher-public-profile-about-me__text'>کلاسی برای نمایش وجود نداره !!!</p>}
          {teacherData.courses.length !== 0 && 
            <Swiper
              spaceBetween={10}
              slidesPerView={'auto'}
              centeredSlides
              navigation={use_mobile ? false : true}
              loop
              keyboard
              centeredSlides
            >
              
              {teacherData.courses.map(item => (
                <SwiperSlide key={item.id}>
                  <CourseCard
                    title={item.title === undefined ? 'title' : item.title}
                    teacherName={
                      item.teacherName === undefined
                        ? teacherData.first_name + ' ' + teacherData.last_name
                        : item.teacherName
                    }
                    rate={item.rate === undefined ? 2 : item.rate}
                    teacherImgSrc={teacherData.image === null ? profile_1 : teacherData.image.image}
                    imgSrc={item.imgSrc === undefined ? image : item.imgSrc}
                  />
                </SwiperSlide>
              ))}
            </Swiper>}
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <Box>
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            maxWidth={'xl'}
          >
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="h4">درباره من</Typography>
            </Grid>
            <Grid item xs={12} maxWidth="80%" sx={{ mt: 5 }} minWidth="80%">
              <div className="abut-me_wrapper">
                <Typography variant="body" className="about-me">
                  {teacherData.bio && ReactHtmlParser(teacherData.bio)}

                  {!teacherData.bio && (
                    <p className="teacher-public-profile-about-me__text">متنی برای نمایش وجود نداره !!!</p>
                  )}
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
  );
}

export default TeacherPublicProfile;
