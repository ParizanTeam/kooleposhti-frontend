import React from 'react';
import CategoryCard from '../CategoryCard';
import { categoryData } from './categoriesData';
import './style.scss';

const Categories = () => {
  return (
    <div className="categories-section">
      <h2 className="categories-section__title">
        چه <span className="categories-section__highlight">موضوع</span>‌‌هایی داریم؟
      </h2>
      <p className="categories-section__description">با کلیک روی هر موضوع، وارد دنیای اون میشی!</p>
      <div className="categories-section__items">
        {categoryData.map(category => (
          <CategoryCard
            id={category.id}
            color={category.color}
            imgSrc={category.imgSrc}
            theme={category.theme}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
