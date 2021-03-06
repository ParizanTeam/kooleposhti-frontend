import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import noPersonImg from '../../assets/images/noperson.png';
import './style.scss';

const TeacherProfileCard = ({ instructor }) => {
  const [showMore, setShowMore] = useState(true);
  const showMoreText = 'نمایش بیشتر...';
  const showLessText = 'نمایش کمتر...';
  if (instructor.first_name != 'null' && instructor.last_name != 'null') {
    return (
      <div className="teacher-profile">
        <div className="teacher-profile__title-img-wrapper">
          <div>
            <h3>درباره مدرس:</h3>
            <Link to={`/public-profile/teacher/${instructor.username}`} className="teacher-profile__name">
              {instructor.first_name && instructor.last_name
                ? instructor.first_name + ' ' + instructor.last_name
                : instructor.username}
            </Link>
            {instructor.title && <p className="teacher-profile__title">{instructor.title}</p>}
          </div>
          <Link to={`/public-profile/teacher/${instructor.username}`}>
            <div className="teacher-profile__avatar">
              <img src={instructor.image?.image || noPersonImg} alt="" />
            </div>
          </Link>
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
