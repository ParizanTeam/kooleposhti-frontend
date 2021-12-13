import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const CategoryCard = ({ id, color, imgSrc, theme, title }) => {
  return (
    <Link
      to={`/classes?category=${id}`}
      className="category-card"
      style={{ backgroundColor: color, boxShadow: `0 0 40px ${color}` }}
    >
      <img src={imgSrc} alt={title} className="category-card__img" />
      <p className="category-card__title" style={{ color: theme == 'light' ? '#fff' : '#4D4D4D' }}>
        {title}
      </p>
    </Link>
  );
};

export default CategoryCard;
