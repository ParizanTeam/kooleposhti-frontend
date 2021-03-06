import React, { useState } from 'react';
import { IconButton, Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './style.scss';
import axios from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { useHistory, useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import apiInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

/*function Heart(EndPoint){
  const history = useHistory();
  //const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    console.log('injam');
    async function fetchData() {
      await axios
      .get(EndPoint)
      .then(res => {
        console.log('likeState', res.data);
        //setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
    }
    fetchData();
  }, []);
};*/
const CourseCard = ({ id, imgSrc, title, teacherImgSrc, teacherName, rate, dir, isCFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(isCFavorite);
  let roles = useSelector(state => state.auth.roles);

  return (
    <Link to={`/courses/${id}`} className="course-card">
      <img src={imgSrc} alt={title} className="course-card__img" />
      <div dir={dir ? dir : 'ltr'} className="course-card__rating-wrapper">
        <Rating
          size="large"
          name="customized-color"
          value={rate}
          precision={0.5}
          icon={<StarRoundedIcon />}
          emptyIcon={<StarOutlineRoundedIcon />}
          readOnly
        />
        {(!roles || roles[0] === 'student') && (
          <IconButton
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (roles) {
                if (roles[0] == 'student') {
                  apiInstance.get(`${baseUrl}/courses/${id}/favorite/${isFavorite ? 'remove' : 'add'}/`);
                  setIsFavorite(state => !state);
                } else {
                  toast.error('?????? ???????????? ???????? ???????? ???????? ????????????');
                }
              } else toast.error('???????? ?????????? ???????? ?????? ???? ??????????????????????? ???????? ?????? ?????? ????????');
            }}
          >
            {isFavorite ? <Favorite className="filled-fav-icon" /> : <FavoriteBorderIcon className="fav-icon" />}
          </IconButton>
        )}
      </div>
      <h3 className="course-card__title">{title}</h3>
      <div className="course-card__footer">
        <img src={teacherImgSrc} alt={teacherName} className="course-card__teacher-img" />
        <p className="course-card__teacher-name">{teacherName}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
