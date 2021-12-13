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

SwiperCore.use([Navigation, Keyboard]);
const MyCourseSlider = () => {
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

const StudentDashboardBookMarkedClasses = () => {
  return (
  <div>
    <StudentDashboardHeader />
    <img src='https://8pic.ir/uploads/1307925801537355428-128.png' alt='bm' className='bmImg'/>
    <br/><br/>
    <div className="afterMyC-a">
      <MyCourseSlider/>
    </div>
    <StudentDashboardFooter />
  </div>
  );
};
export default StudentDashboardBookMarkedClasses;