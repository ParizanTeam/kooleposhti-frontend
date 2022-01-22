import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import BestTeachers from '../BestTeachers';
import Categories from '../Categories';
import CourseSlider from '../CourseSlider';
import Navbar from '../Navbar';
import HowItWorks from '../HowItWorks';
import HomeHeader from '../HomeHeader';
import {ToastContainer} from 'react-toastify';
import Footer from '../Footer';
import './style.scss';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Helmet>
        <title>کوله‌پشتی |‌ پلتفرم پرورش مهارت کودکان و نوجوانان</title>
      </Helmet>
      <Navbar color="#fd576c" />
      <HomeHeader />
      <HowItWorks />
      <Categories />
      <CourseSlider />
      <BestTeachers />
      <ToastContainer rtl={true} position="bottom-center" />

      <Footer />
    </div>
  );
};

export default HomePage;
