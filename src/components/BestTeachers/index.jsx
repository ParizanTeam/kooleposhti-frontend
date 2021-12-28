import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tooltip, Grid } from '@mui/material';
import ReactLoading from 'react-loading';
import noPersonImg from '../../assets/images/noperson.png';
import apiInstance from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import 'swiper/swiper-bundle.min.css';
import './style.scss';
import { Link } from 'react-router-dom';

const BestTeachers = () => {
  const [topTeachers, setTopTeachers] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  useEffect(() => {
    setApiLoading(true);
    apiInstance.get(`${baseUrl}/accounts/instructors/top/`).then(res => {
      setTopTeachers(res.data);
      setApiLoading(false);
    });
  }, []);
  return (
    <div className="best-teachers">
      <h2 className="best-teachers__title">
        از <span className="best-teachers__highlight">بهترین اساتید</span> یاد بگیر!
      </h2>
      {apiLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 96, marginBottom: 96 }}>
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
        </div>
      )}
      {!apiLoading && topTeachers.length > 0 && (
        <Swiper spaceBetween={10} slidesPerView={'auto'}>
          {topTeachers.map(BestTeacher => (
            <SwiperSlide key={BestTeacher.id}>
              <Link to={`/public-profile/teacher/${BestTeacher.username}`}>
                <Tooltip
                  title={
                    <span style={{ fontFamily: 'iranyekan' }}>
                      {BestTeacher.first_name + ' ' + BestTeacher.last_name}
                    </span>
                  }
                  placement="bottom"
                >
                  <img className="best-teachers__teacher-img" src={BestTeacher.image?.image || noPersonImg} />
                </Tooltip>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BestTeachers;
