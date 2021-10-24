import React from 'react';
import BestTeachers from '../BestTeachers';
import Categories from '../Categories';
import CourseSlider from '../CourseSlider';
import Navbar from '../Navbar';
import HowItWorks from '../HowItWorks';
import Footer from '../Footer';
import './style.scss';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <CourseSlider />
      <HowItWorks />
      <Categories />
      <BestTeachers />
      <Footer />
    </div>
  );
};

export default HomePage;
