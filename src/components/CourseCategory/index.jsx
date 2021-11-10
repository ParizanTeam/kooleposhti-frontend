import React from 'react';
import './style.scss';

const CourseCategory = ({ color, imgSrc, theme, title }) => {
  return (
    <a href="#" className="course-category-card" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}>
      <img src={imgSrc} alt={title} className="course-category-card__img" />
      <p className="course-category-card__title" style={{ color: theme == 'light' ? '#fff' : '#4D4D4D' }}>
        {title}
      </p>
    </a>
  );
};

export default CourseCategory;
