//import { useMobile } from '../../utils/detectSource';
import MyClasses from '../MyClasses';
import React from 'react';
import CourseSlider from '../CourseSlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import CourseCard from '../CourseCard';
import { useMobile } from '../../utils/detectSource';
import { coursesData } from '../CourseSlider/coursesData';
import 'swiper/swiper-bundle.min.css';
import './style.scss';

SwiperCore.use([Navigation, Keyboard]);
const MyOngoingCourseSlider = () => {
  return (
    <div className="My-courses-section">
      <h2 className="My-courses-section__title">
        کلاسهای <span className="My-courses-section__highlight"> پیش‌رو </span>من
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
        </div>
      </div>
    </div>
  );
};
const MyDoneCourseSlider = () => {
  return (
    <div className="My-courses-section">
      <h2 className="My-courses-section__title">
        کلاسهای <span className="My-courses-section__highlight"> گذشته </span>من
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
        </div>
      </div>
    </div>
  );
};

const ClassSchedule = () => {
  return (
  <div>
    <MyClasses />
    <br/>
    <div className="afterMyC-c">
        <br/><br/>
        <MyOngoingCourseSlider />
        <MyDoneCourseSlider />
      </div>  

  </div>
  );
};
export default ClassSchedule;