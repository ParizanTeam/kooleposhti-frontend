import React from 'react';
import courseLoaderSrc from '../../assets/images/course_loading.png';
import './style.scss';

const CourseLoader = () => {
  return (
    <div className="course-loader">
      <img src={courseLoaderSrc} alt="loading-image" />
    </div>
  );
};

export default CourseLoader;
