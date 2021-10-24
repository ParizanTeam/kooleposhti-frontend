import React from 'react';
import kidImg from '../../assets/images/kid.png';
import AnimatedLogo from '../AnimatedLogo';

import './style.scss';

const HeaderBanner = () => {
  return (
    <div className="banner-container">
      <div className="banner">
        <img className="banner__kid-img" src={kidImg} />
        <div className="banner__content">
          <AnimatedLogo />
          <h2 className="banner__title">کوله پشتی</h2>
          <p className="banner__description">جایی که بچه‌ها عاشق یادگیری هستن!</p>
          <button className="banner__start-btn">
            همین حالا <span className="banner__start-btn-highlight">شروع کن!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
