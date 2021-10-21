import React from 'react';
import './style.scss';

const CategoryCard = ({ color, imgSrc, theme, title }) => {
  return (
    <a href="#" className="category-card" style={{ backgroundColor: color, boxShadow: `0 0 40px ${color}` }}>
      <img src={imgSrc} alt={title} className="category-card__img" />
      <p className="category-card__title" style={{ color: theme == 'light' ? '#fff' : '#4D4D4D' }}>
        {title}
      </p>
    </a>
  );
};

export default CategoryCard;
