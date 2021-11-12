import { forwardRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useMobile } from '../../utils/detectSource';
import { courseDates } from './courseDates';
import 'swiper/swiper-bundle.min.css';
import './style.scss';

const CourseDateCard = ({ day, weekday, time }) => {
  return (
    <div className="course-date-card">
      <EventNoteIcon className="course-date-card__icon" fontSize="large" />
      <h4 className="course-date-card__day">{day}</h4>
      <p className="course-date-card__weekday">{weekday}</p>
      <p className="course-date-card__time">ساعت:‌ {time}</p>
    </div>
  );
};

SwiperCore.use([Navigation, Keyboard]);
const CourseDates = forwardRef((props, ref) => {
  return (
    <div className="course-dates-section" ref={ref}>
      <h3 className="course-dates-section__title">زمان‌های جلسه‌ها:</h3>
      <div className="carousal-container">
        <div style={{ width: '90%', maxWidth: '90%' }}>
          <Swiper spaceBetween={10} slidesPerView={'auto'} navigation={useMobile() ? false : true}>
            {courseDates.map(item => (
              <SwiperSlide key={item.id}>
                <CourseDateCard day={item.day} weekday={item.weekday} time={item.time} remain={item.remain} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
});

export default CourseDates;
