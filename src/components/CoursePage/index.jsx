import React, { useState, useRef } from 'react';
import { Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TeacherProfileCard from '../TeacherProfileCard';
import CourseCategory from '../CourseCategory';
import { categoryData } from '../Categories/categoriesData';
import { coursesData } from './coursesData';
import { convertNumberToPersian } from '../../utils/helpers';
import CourseDates from '../CourseDates';
import './style.scss';

const CoursePage = () => {
  const datesRef = useRef(null);
  const [showMore, setShowMore] = useState(true);
  const showMoreText = 'نمایش بیشتر...';
  const showLessText = 'نمایش کمتر...';
  const teacherName = 'افشین زنگنه';
  const teacherTitle = 'برنامه نویس در شرکت استادکار';
  const teacherImgSrc = 'https://randomuser.me/api/portraits/men/51.jpg';
  const teacherDescription =
    'افشین دانشجوی مهندسی کامپیوتر در دانشگاه علم‌و‌صنعت می‌باشد. او از سال ۱۳۹۸ شروع به آموزش برنامه‌نویسی به کودکان می‌کند و تجربه‌ی زیادی در این زمینه دارد.';

  const objectives = [
    'یادگیری اصول معماری',
    'ارتباط و شبکه‌سازی با سایر درس‌آموزان دوره',
    'تجربه ساختن یک ماکت واقعی',
    'آشنایی با مفاهیم جذاب ساختن',
  ];
  const tags = ['معماری', 'خلاقیت', 'ساختن', 'کار گروهی'];
  const scrollToDates = () => {
    datesRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <div className="course-page">
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
          <button onClick={scrollToDates} className="course-header__goto-times">
            مشاهده زمان کلاس‌ها
          </button>
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
          {objectives.map((obj, i) => (
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
      <CourseDates ref={datesRef}/>
    </div>
  );
};

export default CoursePage;
