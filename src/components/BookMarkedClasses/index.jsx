//import { useMobile } from '../../utils/detectSource';
import MyClasses from '../MyClasses';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import CourseCard from '../CourseCard';
import { useMobile } from '../../utils/detectSource';
import { coursesData } from '../CourseSlider/coursesData';
import 'swiper/swiper-bundle.min.css';
import './style.scss';
import MyClassesFooter from '../MyClasses/MyClassesFooter';

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

const BookMarkedClasses = () => {
  return (
  <div>
    <MyClasses />
    <br/><br/>
    <div className="afterMyC-a">
      <MyCourseSlider/>
    </div>
    <MyClassesFooter />
  </div>
  );
};
export default BookMarkedClasses;