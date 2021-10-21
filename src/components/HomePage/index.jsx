import React from 'react';
import BestTeachers from '../BestTeachers';
import Categories from '../Categories';
import CourseSlider from '../CourseSlider';
import Navbar from '../Navbar';
import HowItWorks from '../HowItWorks';
import './style.scss';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <CourseSlider />
      <HowItWorks />
      <Categories />
      <BestTeachers />
    </div>
  );
};

export default HomePage;
