import React from 'react';
import AOS from 'aos';
import AnimatedLogo from '../AnimatedLogo';
import banner from '../../assets/images/banner.png';
import 'aos/dist/aos.css';
import './style.scss';

AOS.init();
const HomeHeader = () => {
  return (
    <div className="home-banner">
      <img className="home-banner__img" src={banner} alt="home banner" />
      <AnimatedLogo />
      <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="home-banner__title">
        کوله‌پشتی
      </h2>
      <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" className="home-banner__description">
        جایی که بچه‌ها عاشق یادگیری هستن!
      </p>
      <button className="home-banner__start-btn">
        همین حالا <span className="home-banner__start-btn-highlight">شروع کن...</span>
      </button>
    </div>
  );
};

export default HomeHeader;
