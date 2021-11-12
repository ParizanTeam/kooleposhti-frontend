import React, { useState } from 'react';
import './style.scss';

const TeacherProfileCard = ({ teacherName, teacherTitle, teacherDescription, teacherImgSrc }) => {
  const [showMore, setShowMore] = useState(true);
  const showMoreText = 'نمایش بیشتر...';
  const showLessText = 'نمایش کمتر...';
  return (
    <div className="teacher-profile">
      <div className="teacher-profile__title-img-wrapper">
        <div>
        <h3>درباره مدرس:</h3>
        <a href="" className="teacher-profile__name">
          {teacherName}
        </a>
        <p className="teacher-profile__title">{teacherTitle}</p>
        </div>
        <a href="">
          <div className="teacher-profile__avatar">
            <img src={teacherImgSrc} alt="" />
          </div>
        </a>
      </div>
      <p className="teacher-profile__description">
        {teacherDescription.length <= 100 && teacherDescription}
        {teacherDescription.length > 100 && showMore && teacherDescription.slice(0, 100) + '... '}
        {teacherDescription.length > 100 && !showMore && teacherDescription}
        {teacherDescription.length > 100 && (
          <button className="showmore" onClick={() => setShowMore(state => !state)}>
            {showMore ? showMoreText : showLessText}
          </button>
        )}
      </p>
    </div>
  );
};

export default TeacherProfileCard;
