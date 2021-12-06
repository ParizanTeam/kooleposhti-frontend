import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import CourseCard from '../CourseCard';
import { useMobile } from '../../utils/detectSource';
import { coursesData } from './coursesData';
import 'swiper/swiper-bundle.min.css';
import './style.scss';

SwiperCore.use([Navigation, Keyboard]);
const CourseSlider = () => {
  return (
    <div className="courses-section">
      <h2 className="courses-section__title">
        کلاس‌های <span className="courses-section__highlight">خفن</span>!
      </h2>
      <div className="carousal-container">
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

export default CourseSlider;
