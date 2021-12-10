import React, { useState } from 'react';
import { Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Modal, Fade, Backdrop } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { convertNumberToPersian, formatPrice } from '../../utils/helpers';

import './style.scss';
import { Fragment } from 'react';

const classesData = [
  {
    classImg:
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/2Bwlvhj4TbavIVOKkWLe',
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
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/Ce1jWv9fRTacTUoBbbpN',
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
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/2Bwlvhj4TbavIVOKkWLe',
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
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/Ce1jWv9fRTacTUoBbbpN',
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
        <div className="class-card__teacher-rating-wrapper">
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
        </div>
        <div className="class-card__date-price-wrapper">
          <div className="class-card__date">
            <EventNoteIcon /> {date}
          </div>
          <div className="class-card__price">{formatPrice(convertNumberToPersian(price))} تومان</div>
        </div>
      </div>
    </div>
  );
};

const Filters = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [priceAnchorEl, setPriceAnchorEl] = useState(null);
  const openPrice = Boolean(priceAnchorEl);
  const [ageAnchorEl, setAgeAnchorEl] = useState(null);
  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const [openFiltersModal, setOpenFiltersModal] = useState(false);

  const handleFiltersModalClose = () => {
    setOpenFiltersModal(false);
  };

  const [value, setValue] = React.useState([10000, 500000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePriceClick = event => {
    setPriceAnchorEl(event.currentTarget);
  };
  const handleAgeClick = event => {
    setAgeAnchorEl(event.currentTarget);
  };
  const handleDateClick = event => {
    setDateAnchorEl(event.currentTarget);
  };
  const handlePriceClose = () => {
    setPriceAnchorEl(null);
  };
  const handleAgeClose = () => {
    setAgeAnchorEl(null);
  };
  const handleDateClose = () => {
    setDateAnchorEl(null);
  };
  const toggleSubjectFilter = e => e.target.classList.toggle('active');

  return (
    <Fragment>
      <Navbar color="#fd576c" />
      <div className="filters-page">
        <h1 className="filters-page__title">پیداکردن کلاس مورد نظر</h1>
        <div className="filters">
          <div className="filters__search-wrapper">
            <div className="filters__search-icon">
              <SearchIcon />
            </div>
            <input placeholder="جستجوی در نام کلاس..." className="filters__search-input" />
          </div>
          {!isMobile && (
            <div>
              <div className="filters__other-filters">
                <div className="filters__filter-wrapper">
                  <div className="filters__filter" onClick={handlePriceClick}>
                    هر قیمتی...
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={priceAnchorEl}
                    open={openPrice}
                    onClose={handlePriceClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <div style={{ width: '300px', padding: '40px 16px 16px' }}>
                      <div style={{ padding: '0 24px' }}>
                        <Slider
                          value={value}
                          valueLabelFormat={value => formatPrice(convertNumberToPersian(value))}
                          about="wow"
                          min={0}
                          max={2000000}
                          step={10000}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                        />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        از {convertNumberToPersian(formatPrice(value[0]))} تومان تا{' '}
                        {convertNumberToPersian(formatPrice(value[1]))} تومان
                      </div>
                      <div style={{ padding: 8, display: 'flex', justifyContent: 'space-around', marginTop: 16 }}>
                        <button className="success-btn">اعمال</button>
                        <button className="info-btn" onClick={handlePriceClose}>
                          بازگشت
                        </button>
                      </div>
                    </div>
                  </Menu>
                </div>
                <div className="filters__filter-wrapper">
                  <div onClick={handleAgeClick} className="filters__filter">
                    هر سنی...
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={ageAnchorEl}
                    open={Boolean(ageAnchorEl)}
                    onClose={handleAgeClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <div style={{ maxWidth: '250px' }}>
                      <RadioGroup aria-label="gender" defaultValue="any" name="radio-buttons-group">
                        <FormControlLabel value="any" control={<Radio />} label="هر سنی" />
                        <FormControlLabel value="4-7" control={<Radio />} label="۴ تا ۷ سال" />
                        <FormControlLabel value="7-10" control={<Radio />} label="۷ تا ۱۰ سال" />
                        <FormControlLabel value="10-13" control={<Radio />} label="۱۰ تا ۱۳ سال" />
                        <FormControlLabel value="13-18" control={<Radio />} label="۱۳ تا ۱۸ سال" />
                        <FormControlLabel value="4-10" control={<Radio />} label="۴ تا ۱۰ سال" />
                        <FormControlLabel value="10-18" control={<Radio />} label="۱۰ تا ۱۸ سال" />
                        <FormControlLabel value="4-18" control={<Radio />} label="۴ تا ۱۸ سال" />
                      </RadioGroup>
                      <div style={{ padding: 8, display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
                        <button className="success-btn">اعمال</button>
                        <button className="info-btn" onClick={handleAgeClose}>
                          بازگشت
                        </button>
                      </div>
                    </div>
                  </Menu>
                </div>
                <div className="filters__filter-wrapper">
                  <div onClick={handleDateClick} className="filters__filter">
                    هر تاریخی...
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={dateAnchorEl}
                    open={Boolean(dateAnchorEl)}
                    onClose={handleDateClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <div></div>
                  </Menu>
                </div>
              </div>
              <div className="filters__subjects">
                <div className="filters__subjects-title">موضوعات: </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  مد و لباس
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  زیبایی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  کتاب
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  ساختن
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  خوشمزه
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  کاردستی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  بازی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  نوزاد
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  ورزشی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  مسافرت
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  حیوانات
                </div>
              </div>
            </div>
          )}
          {isMobile && (
            <button
              onClick={() => setOpenFiltersModal(true)}
              style={{ margin: '8px 0 0', display: 'flex', alignItems: 'center' }}
              className="info-btn"
            >
              فیلترها
              <FilterAltIcon style={{ marginRight: 4 }} />
            </button>
          )}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openFiltersModal}
          onClose={handleFiltersModalClose}
        >
          <Fade in={openFiltersModal}>
            <div
              style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#fff',
                zIndex: 10,
                position: 'relative',
                overflowY: 'scroll',
                overflowX: 'hidden',
                padding: 24,
              }}
            >
              <div>
                <div>قیمت:‌ </div>
                <div style={{ padding: '0 24px' }}>
                  <Slider
                    value={value}
                    valueLabelFormat={value => formatPrice(convertNumberToPersian(value))}
                    about="wow"
                    min={0}
                    max={2000000}
                    step={10000}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  از {convertNumberToPersian(formatPrice(value[0]))} تومان تا{' '}
                  {convertNumberToPersian(formatPrice(value[1]))} تومان
                </div>
              </div>
              <div style={{ margin: '32px 0' }}>
                <div>سن: </div>
                <RadioGroup aria-label="gender" defaultValue="any" name="radio-buttons-group">
                  <FormControlLabel value="any" control={<Radio />} label="هر سنی" />
                  <FormControlLabel value="4-7" control={<Radio />} label="۴ تا ۷ سال" />
                  <FormControlLabel value="7-10" control={<Radio />} label="۷ تا ۱۰ سال" />
                  <FormControlLabel value="10-13" control={<Radio />} label="۱۰ تا ۱۳ سال" />
                  <FormControlLabel value="13-18" control={<Radio />} label="۱۳ تا ۱۸ سال" />
                  <FormControlLabel value="4-10" control={<Radio />} label="۴ تا ۱۰ سال" />
                  <FormControlLabel value="10-18" control={<Radio />} label="۱۰ تا ۱۸ سال" />
                  <FormControlLabel value="4-18" control={<Radio />} label="۴ تا ۱۸ سال" />
                </RadioGroup>
              </div>
              <div className="filters__subjects-title">موضوعات: </div>
              <div className="filters__subjects">
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  مد و لباس
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  زیبایی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  کتاب
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  ساختن
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  خوشمزه
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  کاردستی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  بازی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  نوزاد
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  ورزشی
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  مسافرت
                </div>
                <div onClick={toggleSubjectFilter} className="filters__subject">
                  حیوانات
                </div>
              </div>
              <div style={{ padding: 8, display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
                <button className="success-btn">اعمال</button>
                <button className="info-btn" onClick={handleFiltersModalClose}>
                  بازگشت
                </button>
              </div>
            </div>
          </Fade>
        </Modal>

        {classesData.map(classData => (
          <ClassCard classData={classData} />
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Filters;
