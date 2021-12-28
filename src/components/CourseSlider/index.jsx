import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import ReactLoading from 'react-loading';
import CourseCard from '../CourseCard';
import { useMobile } from '../../utils/detectSource';
import noPersonImg from '../../assets/images/noperson.png';
import apiInstance from '../../utils/axiosConfig';
import 'swiper/swiper-bundle.min.css';
import './style.scss';
import { baseUrl } from '../../utils/constants';

SwiperCore.use([Navigation, Keyboard]);
const CourseSlider = () => {
  const [topCourses, setTopCourses] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  useEffect(() => {
    setApiLoading(true);
    apiInstance.get(`${baseUrl}/courses/top/`).then(res => {
      setTopCourses(res.data);
      setApiLoading(false);
    });
  }, []);
  const isMobile = useMobile();
  return (
    <div className="courses-section">
      <h2 className="courses-section__title">
        کلاس‌های <span className="courses-section__highlight">خفن</span>!
      </h2>
      {apiLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 96, marginBottom: 96 }}>
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
        </div>
      )}
      {!apiLoading && topCourses.length > 0 && (
        <div className="carousal-container">
          <div style={{ width: isMobile ? '100%' : '90%' }}>
            <Swiper
              spaceBetween={10}
              slidesPerView={'auto'}
              centeredSlides
              navigation={isMobile ? false : true}
              loop
              keyboard
              centeredSlides
            >
              {topCourses.map(item => (
                <SwiperSlide key={item.id}>
                  <CourseCard
                    id={item.id}
                    username={item.instructor.username}
                    title={item.title}
                    teacherName={item.instructor.first_name + ' ' + item.instructor.last_name}
                    rate={item.rate}
                    teacherImgSrc={item.teacherImgSrc || noPersonImg}
                    imgSrc={
                      (item.image && 'https:/kooleposhti.ml/' + item.image) ||
                      'https://www.inklyo.com/wp-content/uploads/How-to-Succeed-in-an-Online-Course.jpg'
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;
