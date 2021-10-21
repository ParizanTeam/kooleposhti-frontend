import React from 'react';
import BestTeachers from '../BestTeachers';
import Categories from '../Categories';
import CourseSlider from '../CourseSlider';
import './style.scss';

const HomePage = () => {
  return (
    <div>
      <CourseSlider />
      <Categories />
      <BestTeachers />
    </div>
  );
};

export default HomePage;
