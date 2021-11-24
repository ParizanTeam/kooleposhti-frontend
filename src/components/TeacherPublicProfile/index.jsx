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
import './style.scss';

import './style.scss';

function TeacherPublicProfile(props) {
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

  const [value, setValue] = React.useState(3);

  const teacher_profile1 = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={back_profile2} alt="teacher_profile" className="image" style={{ minWidth: '320px' , maxWidth: '1000px'}} />
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
            src={profile_1}
            alt="profile"
            sx={{
              width: {
                lg: breakpoint2 ? '15vmin' : '23vmin',
                md: breakpoint1 ? '9vmin' : '10vmin',
                sm: '10vmin',
                xs: '14vmin',
              },
              height: {
                lg: breakpoint2 ? '15vmin' : '23vmin',
                md: breakpoint1 ? '9vmin' : '10vmin',
                sm: '10vmin',
                xs: '14vmin',
              },
              borderRadius: '50%',
              mt: { lg: '12vmin', md: '8vmin', sm: '6vmin', xs: '10vmin' },
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
              color: 'blue',
            }}
          >
            EmadMousavi
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: '1vmin',
              fontSize: { lg: '1.1rem', sm: '1.2vmin', xs: '1.3vmax' },
              width: '20vmax',
              textAlign: 'center',
            }}
          >
            سید عماد موسوی
          </Typography>
          <Rating
            name="simple-controlled"
            readOnly
            precision={0.5}
            value={value}
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

  /*  SwiperCore.use([Navigation, Keyboard]); */
  const TeacherClasses = () => {
    return (
      <div className="My-courses-section">
        <h2 className="My-courses-section__title">لیست کلاس ها</h2>
        <div className="My-carousal-container">
          <Grid sx={{ width: { md: '85%', xs: '90vmin' } }}>
            <Swiper
              spaceBetween={10}
              slidesPerView={'auto'}
              centeredSlides
              navigation={useMobile() ? false : true}
              loop
              keyboard
              centeredSlides
            >
              {coursesData.map(item => (
                <SwiperSlide key={item.id}>
                  <CourseCard
                    title={item.title}
                    teacherName={item.teacherName}
                    rate={item.rate}
                    teacherImgSrc={item.teacherImgSrc}
                    imgSrc={item.imgSrc}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <Box>
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
        <Grid item xs={12} maxWidth="1180px" sx={{ mt: 5 }}>
          <div className="abut-me_wrapper">
            <Typography variant="body" className="about-me">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi voluptatibus praesentium magnam magni,
              sequi velit, dolorum esse id obcaecati numquam tenetur, in rem saepe. Rem, dolore! Distinctio in harum
              ipsa ad, error atque nobis voluptate commodi corrupti veniam ex obcaecati reprehenderit velit, sequi,
              molestiae itaque eos porro accusantium. Quam dolor voluptatibus recusandae id, qui adipisci eaque
              consequuntur ducimus minima consequatur sunt? Illo quam alias quisquam! A pariatur officiis nulla
              reprehenderit labore recusandae molestias nobis, doloremque, reiciendis assumenda dolorem consectetur
              repudiandae magni asperiores nostrum esse amet. Eos unde dicta hic, aspernatur quo tempore exercitationem
              autem dolorum illo totam amet aliquid commodi ipsa neque quibusdam perferendis ab delectus ea, deserunt
              sapiente est. Aspernatur quod ex aliquam quos optio, minima, rem hic earum molestias cum fugit? Mollitia,
              optio, earum ad minima rem reprehenderit, accusantium temporibus assumenda vel illum ullam? Sed hic
              debitis accusamus quo accusantium necessitatibus praesentium deleniti nesciunt, in illum totam nisi
              distinctio atque dicta ex suscipit dolorum enim aperiam ad id temporibus quaerat ratione laboriosam ipsam.
              Aliquid repudiandae nam explicabo saepe ut tenetur, distinctio repellat sapiente aut magnam dignissimos
              repellendus libero laudantium, quas ipsum nesciunt assumenda molestiae omnis! Harum voluptatum
              reprehenderit atque enim neque deleniti nostrum, in alias est impedit optio. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos, quibusdam praesentium. Quo cupiditate dolor numquam aliquid
              minima atque illum est! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae modi
              similique, ea deleniti aperiam veritatis? Atque earum, aliquid quidem, dicta distinctio ullam saepe
              similique voluptas facilis provident assumenda repudiandae fugiat impedit sit rerum maiores. Ut beatae
              tempore deserunt ea ex perferendis nam repellendus cum neque dolores explicabo, nobis voluptatibus atque?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, enim, quo repudiandae eveniet laborum rem
              excepturi iusto illum, voluptatem alias animi molestias veritatis expedita asperiores deserunt quam
              adipisci quod! Dolore cum veniam dolorem? Obcaecati ducimus odio, quas, laboriosam porro consequuntur
              tenetur iste debitis beatae numquam, animi quo similique deleniti officiis iusto. Placeat impedit modi quo
              sapiente quae asperiores natus eligendi inventore itaque! Delectus exercitationem velit vitae nam minus.
              Ipsa nam quos saepe. Ducimus beatae ex, commodi officiis quae et eum.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sx={{ mt: -30 }}>
          <div className="afterMyC-a">
            <TeacherClasses />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeacherPublicProfile;
