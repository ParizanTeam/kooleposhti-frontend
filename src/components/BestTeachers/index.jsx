import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tooltip } from '@mui/material';
import { bestTeachersData } from './bestTeachersData';
import 'swiper/swiper-bundle.min.css';
import './style.scss';

const BestTeachers = () => {
  return (
    <div className="best-teachers">
      <h2 className="best-teachers__title">
        از <span className="best-teachers__highlight">بهترین اساتید</span> یاد بگیر!
      </h2>
      <Swiper spaceBetween={10} slidesPerView={'auto'}>
        {bestTeachersData.map(BestTeacher => (
          <SwiperSlide key={BestTeacher.id}>
            <a href="#">
              <Tooltip
                title={<span style={{ fontFamily: 'iranyekan' }}>{BestTeacher.teacherName}</span>}
                placement="bottom"
              >
                <img className="best-teachers__teacher-img" src={BestTeacher.teacherImgSrc} />
              </Tooltip>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestTeachers;