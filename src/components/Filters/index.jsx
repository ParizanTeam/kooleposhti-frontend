import React from 'react';
import { Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { convertNumberToPersian, formatPrice } from '../../utils/helpers';

import './style.scss';

const classesData = [
  {
    classImg:
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/RNiXoCtTjmranNXeeOWw',
    age: '۳-۷',
    title: 'آزمایش‌های علمی رنگارنگ',
    description:
      'در این کلاس کودکان به انجام آزمایش‌های علمی و رنگارنگ گوناگون برای آشنایی بیشتر با رنگ‌ها می‌پردازند.',
    teacherImg: 'https://randomuser.me/api/portraits/men/51.jpg',
    teacherName: 'افشین زنگنه',
    rating: 4.5,
    date: 'از ۱۴۰۰/۱۰/۲۰ تا ۱۴۰۰/۱۰/۳۰',
    price: '40000',
  },
  {
    classImg:
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/RNiXoCtTjmranNXeeOWw',
    age: '۳-۷',
    title: 'آزمایش‌های علمی رنگارنگ',
    description:
      'در این کلاس کودکان به انجام آزمایش‌های علمی و رنگارنگ گوناگون برای آشنایی بیشتر با رنگ‌ها می‌پردازند.',
    teacherImg: 'https://randomuser.me/api/portraits/men/51.jpg',
    teacherName: 'افشین زنگنه',
    rating: 4.5,
    date: 'از ۱۴۰۰/۱۰/۲۰ تا ۱۴۰۰/۱۰/۳۰',
    price: '40000',
  },
  {
    classImg:
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/RNiXoCtTjmranNXeeOWw',
    age: '۳-۷',
    title: 'آزمایش‌های علمی رنگارنگ',
    description:
      'در این کلاس کودکان به انجام آزمایش‌های علمی و رنگارنگ گوناگون برای آشنایی بیشتر با رنگ‌ها می‌پردازند.',
    teacherImg: 'https://randomuser.me/api/portraits/men/51.jpg',
    teacherName: 'افشین زنگنه',
    rating: 4.5,
    date: 'از ۱۴۰۰/۱۰/۲۰ تا ۱۴۰۰/۱۰/۳۰',
    price: '40000',
  },
  //   {
  //     classImg: '',
  //     age: '',
  //     title: '',
  //     description: '',
  //     teacherImg: '',
  //     teacherName: '',
  //     rating: '',
  //     date: '',
  //     price: '',
  //   },
];

const ClassCard = ({ classData }) => {
  const { classImg, age, title, description, teacherImg, teacherName, rating, date, price } = classData;
  return (
    <div className="class-card">
      <div className="class-card__img-wrapper">
        <img className="class-card__img" src={classImg} alt={title} />
      </div>
      <div className="class-card__content">
        <div className="class-card__age">سن {age}</div>
        <h3 className="class-card__title">{title}</h3>
        <p className="class-card__description">{description}</p>
        <div className="class-teacher-card">
          <div className="class-teacher-card__img-wrapper">
            <img className="class-teacher-card__img" src={teacherImg} alt="" />
          </div>
          <div className="class-teacher-card__name">{teacherName}</div>
        </div>
        <div className="class-card__rating" dir="ltr">
          <Rating
            size="small"
            value={rating}
            precision={0.5}
            icon={<StarRoundedIcon />}
            emptyIcon={<StarOutlineRoundedIcon />}
            readOnly
          />
        </div>
        <div className="class-card__date-price-wrapper">
          <div className="class-card__date">
            <EventNoteIcon /> {date}
          </div>
          <div className="class-card__price">
            <AttachMoneyIcon /> {formatPrice(convertNumberToPersian(price))} تومان
          </div>
        </div>
      </div>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="filters">
      <h1>صفحه فیلترها</h1>
      {classesData.map(classData => (
        <ClassCard classData={classData} />
      ))}
    </div>
  );
};

export default Filters;
