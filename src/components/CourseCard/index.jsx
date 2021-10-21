import React, { useState } from 'react';
import { IconButton, Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import './style.scss';
import { Favorite } from '@mui/icons-material';

const CourseCard = ({ imgSrc, title, teacherImgSrc, teacherName, rate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <a href="#" className="course-card">
      <img src={imgSrc} alt={title} className="course-card__img" />
      <div dir="ltr" className="course-card__rating-wrapper">
        <Rating
          size="large"
          name="customized-color"
          value={rate}
          precision={0.5}
          icon={<StarRoundedIcon />}
          emptyIcon={<StarOutlineRoundedIcon />}
          readOnly
        />
        <IconButton onClick={() => setIsFavorite(state => !state)}>
          {isFavorite ? <Favorite className="filled-fav-icon" /> : <FavoriteBorderIcon className="fav-icon" />}
        </IconButton>
      </div>
      <h3 className="course-card__title">{title}</h3>
      <div className="course-card__footer">
        <img src={teacherImgSrc} alt={teacherName} className="course-card__teacher-img" />
        <p className="course-card__teacher-name">{teacherName}</p>
      </div>
    </a>
  );
};

export default CourseCard;
