import React from 'react';
import { Helmet } from 'react-helmet';
import BestTeachers from '../BestTeachers';
import Categories from '../Categories';
import CourseSlider from '../CourseSlider';
import Navbar from '../Navbar';
import HowItWorks from '../HowItWorks';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import './style.scss';

const HomePage = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Helmet>
        <title>کوله‌پشتی |‌ پلتفرم پرورش مهارت کودکان و نوجوانان</title>
      </Helmet>
      <Navbar />
      <HomeHeader />
      <HowItWorks />
      <Categories />
      <CourseSlider />
      <BestTeachers />
      <Footer />
    </div>
  );
};

export default HomePage;
