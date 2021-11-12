import React, { useState, useRef, useEffect } from 'react';
import { Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TeacherProfileCard from '../TeacherProfileCard';
import CourseCategory from '../CourseCategory';
import { categoryData } from '../Categories/categoriesData';
import { coursesData } from './coursesData';
import { convertNumberToPersian } from '../../utils/helpers';
import CourseDates from '../CourseDates';
import './style.scss';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const CoursePage = () => {
  const datesRef = useRef(null);
  const [showMore, setShowMore] = useState(true);
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showMoreText = 'نمایش بیشتر...';
  const showLessText = 'نمایش کمتر...';
  const teacherName = 'افشین زنگنه';
  const teacherTitle = 'برنامه نویس در شرکت استادکار';
  const teacherImgSrc = 'https://randomuser.me/api/portraits/men/51.jpg';
  const teacherDescription =
    'افشین دانشجوی مهندسی کامپیوتر در دانشگاه علم‌و‌صنعت می‌باشد. او از سال ۱۳۹۸ شروع به آموزش برنامه‌نویسی به کودکان می‌کند و تجربه‌ی زیادی در این زمینه دارد.';

  const tags = ['معماری', 'خلاقیت', 'ساختن', 'کار گروهی'];
  const scrollToDates = () => {
    datesRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    axios.get('https://kooleposhti.herokuapp.com/courses/13/').then(res => console.log(res.data));
  }, []);

  return (
    <div className="course-page">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="course-header">
        <div className="course-header__first-section-wrapper">
          <div className="course-header__categories">
            {categoryData.slice(3, 4).map(category => (
              <CourseCategory
                color={category.color}
                imgSrc={category.imgSrc}
                theme={category.theme}
                title={category.title}
              />
            ))}
          </div>
          <div className="course-header__title">{coursesData.title}</div>
          <div className="course-header__rating">
            <Rating
              size="large"
              name="customized-color"
              value={coursesData.rate}
              precision={0.5}
              icon={<StarRoundedIcon />}
              emptyIcon={<StarOutlineRoundedIcon />}
              readOnly
            />
            {' ' + convertNumberToPersian(coursesData.rate)}
          </div>

          <div className="course-header__description">
            {coursesData.description.length <= 250 && coursesData.description}
            {coursesData.description.length > 250 && showMore && coursesData.description.slice(0, 250) + '... '}
            {coursesData.description.length > 250 && !showMore && coursesData.description}
            {coursesData.description.length > 250 && (
              <button className="showmore" onClick={() => setShowMore(state => !state)}>
                {showMore ? showMoreText : showLessText}
              </button>
            )}
          </div>
          <div className="course-header__class-info">
            <button onClick={scrollToDates} className="course-header__goto-times">
              مشاهده زمان جلسه‌ها
            </button>
            <button className="course-header__register" onClick={handleOpen}>
              ثبت‌نام‌ در کلاس
            </button>
          </div>
          <p className="course-header__remain">ظرفیت باقیمانده: {convertNumberToPersian(2)} نفر</p>
        </div>
        <div className="course-header__img">
          <img src={coursesData.imgSrc} alt="" />
        </div>
      </div>
      <div className="course-tags">
        {tags.map((tag, i) => (
          <div className="course-tags__tag" key={i}>
            {tag}
          </div>
        ))}
      </div>
      <div className="course-info">
        <div className="course-info__item">
          <ScheduleOutlinedIcon />
          <p>۳۰ دقیقه</p>
        </div>
        <div className="course-info__item">
          <PeopleOutlineIcon />
          <p>۶ نفر در هر کلاس</p>
        </div>
        <div className="course-info__item">
          <CakeOutlinedIcon />
          <p>۴ تا ۱۰ ساله‌ها</p>
        </div>
        <div className="course-info__item">
          <LocalOfferOutlinedIcon />
          <p>۱۰۰,۰۰۰ تومان</p>
        </div>
      </div>
      <div className="course-objectives">
        <p className="course-objectives__title">مهارت‌هایی که در پایان کلاس خواهید آموخت:</p>
        <div className="course-objectives__items">
          {coursesData.objectives.map((obj, i) => (
            <div className="course-objectives__item">
              <DoneAllIcon />
              <p>{obj}</p>
            </div>
          ))}
        </div>
      </div>
      <TeacherProfileCard
        teacherName={teacherName}
        teacherTitle={teacherTitle}
        teacherDescription={teacherDescription}
        teacherImgSrc={teacherImgSrc}
      />
      <CourseDates ref={datesRef} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="register-modal">
            <h4 className="register-modal__title">آیا از شرکت توی این کلاس مطمئنی؟</h4>
            <button className="register-modal__confirm">ثبت‌نام</button>
            <button className="register-modal__cancel" onClick={handleClose}>
              بازگشت
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CoursePage;
