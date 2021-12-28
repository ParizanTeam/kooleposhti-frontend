//import { useMobile } from '../../utils/detectSource';
import StudentDashboardHeader from '../StudentDashboardHeader';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import CourseCard from '../CourseCard';
import { useMobile } from '../../utils/detectSource';
import { coursesData } from './coursesData.js';
import 'swiper/swiper-bundle.min.css';
import './style.scss';
import StudentDashboardFooter from '../StudentDashboardHeader/StudentDashboardFooter';
import { useSelector } from 'react-redux';
//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import './style.scss';
import {useMediaQuery } from '@mui/material';
import axios from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { change_profile_color } from '../../store/actions';

SwiperCore.use([Navigation, Keyboard]);
const MyCourseSlider = () => {
  const [loading, setLoading] = React.useState(true);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [favorites, setfavorites] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${baseUrl}/accounts/students/favorites/`)
      .then(res => {
        setfavorites(res.data);
        console.log('favorite classes', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);
  return (
    <div className="My-courses-section">
      <h2 className="My-courses-section__title">
        مورد <span className="My-courses-section__highlight"> &#x2665; </span>ها
      </h2>
      <div className="My-carousal-container">
        <div style={{ width: useMobile() ? '100%' : '90%' }}>
          <Swiper
            spaceBetween={10}
            slidesPerView={'auto'}
            centeredSlides
            navigation={useMobile() ? false : true}
            loop
            keyboard
            centeredSlides
          >
            {favorites.map(item => (
              <SwiperSlide key={item.id}>
                <CourseCard
                  title={item.title}
                  teacherName={item.instructor.last_name}
                  rate={item.rate}
                  teacherImgSrc={item.instructor.image}
                  imgSrc={item.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const StudentDashboardBookMarkedClasses = () => {
  const themeProps = useSelector(state => state.theme);
  let theNewone = localStorage.getItem("chosenColor");
  change_profile_color(theNewone);
  return (
  <div>
    <StudentDashboardHeader />
    <img src={themeProps.btnLabel} alt='bm' className='bmImg'/>
    <br/><br/>
    <div className="afterMyC-a">
      <MyCourseSlider/>
    </div>
    <StudentDashboardFooter />
  </div>
  );
};
export default StudentDashboardBookMarkedClasses;