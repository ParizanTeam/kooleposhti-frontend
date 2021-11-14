import React, { useState } from 'react';
import './style.scss';

const TeacherProfileCard = ({ instructor }) => {
  const [showMore, setShowMore] = useState(true);
  const showMoreText = 'نمایش بیشتر...';
  const showLessText = 'نمایش کمتر...';
  if (instructor.first_name && instructor.last_name) {
    return (
      <div className="teacher-profile">
        <div className="teacher-profile__title-img-wrapper">
          <div>
            <h3>درباره مدرس:</h3>
            <a href="" className="teacher-profile__name">
              {instructor.first_name} {instructor.last_name}
            </a>
            {instructor.title && <p className="teacher-profile__title">{instructor.title}</p>}
          </div>
          <a href="">
            <div className="teacher-profile__avatar">{instructor.image && <img src={instructor.image} alt="" />}</div>
          </a>
        </div>
        {instructor.description && (
          <p className="teacher-profile__description">
            {instructor.description.length <= 100 && instructor.description}
            {instructor.description.length > 100 && showMore && instructor.description.slice(0, 100) + '... '}
            {instructor.description.length > 100 && !showMore && instructor.description}
            {instructor.description.length > 100 && (
              <button className="showmore" onClick={() => setShowMore(state => !state)}>
                {showMore ? showMoreText : showLessText}
              </button>
            )}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default TeacherProfileCard;
