import React, { useState, useEffect, useRef, useReducer } from 'react';
import { Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ReactLoading from 'react-loading';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { useMediaQuery, Typography } from '@mui/material';
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
import { convertNumberToEnglish, convertNumberToPersian, formatPrice } from '../../utils/helpers';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import './style.scss';
import { Fragment } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { categoryData } from '../Categories/categoriesData';
import apiInstance from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { Helmet } from 'react-helmet';

const classesData = [
  {
    classImg:
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/2Bwlvhj4TbavIVOKkWLe',
    age: '۳ تا ۷ سال',
    title: 'آزمایش‌های علمی رنگارنگ',
    description:
      'در این کلاس کودکان به انجام آزمایش‌های علمی و رنگارنگ گوناگون برای آشنایی بیشتر با رنگ‌ها می‌پردازند و کار با آن ها را یاد می‌گیرند.',
    teacherImg: 'https://randomuser.me/api/portraits/men/51.jpg',
    teacherName: 'افشین زنگنه',
    rating: 4.5,
    date: 'از ۱۴۰۰/۱۰/۲۰ تا ۱۴۰۰/۱۰/۳۰',
    price: '40000',
  },
  {
    classImg:
      'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=height:358,width:688/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/Ce1jWv9fRTacTUoBbbpN',
    age: '۳ تا ۷ سال',
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
    age: '۳ تا ۷ سال',
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
    age: '۳ تا ۷ سال',
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
    age: '۳ تا ۷ سال',
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
    age: '۳ تا ۷ سال',
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
export const AnyDateOrTime = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const days_label = {
    Sunday: 'ش',
    Saturday: '۱ش',
    Monday: '۲ش',
    Tuesday: '۳ش',
    Wednesday: '۴ش',
    Thursday: '۵ش',
    Friday: 'جمعه',
  };
  const days_selected = {
    Sunday: false,
    Saturday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Weekdays: false,
    Weekend: false,
  };

  const days_active = {
    Sunday: '',
    Saturday: '',
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Weekdays: '',
    Weekend: '',
  };
  const daysMode = {
    Weekdays: ['Sunday', 'Saturday', 'Monday', 'Tuesday', 'Wednesday'],
    Weekend: ['Thursday', 'Friday'],
  };
  const [selectedDays, setSelectedDays] = React.useState(() => days_active);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleDayFilter = (e, value) => {
    days_selected[value] ^= true;
    if (value == 'Weekend' || value == 'Weekdays')
      daysMode[value].forEach(x => (days_selected[x] = days_selected[value]));
    console.log('days selected', days_selected);
    toggleDays();
    forceUpdate();
  };
  const toggleDays = () => {
    for (var day in days_selected) {
      if (days_selected[day]) days_active[day] = 'active';
      else days_active[day] = '';
    }
    setSelectedDays(days_active);
    console.log('days_active', days_active);
  };
  return (
    <div>
      {isMobile ? (
        <div>روزها:</div>
      ) : (
        <Typography
          variant="h6"
          style={{
            padding: '10px 20px 20px 20px',
            display: 'flex',
            textAlign: 'right',
          }}
          dir="rtl"
        >
          روز های هفته
        </Typography>
      )}

      <div className="filters__weekdays">
        {Object.entries(days_label).map(([val, label]) => (
          <div onClick={e => handleDayFilter(e, val)} className={`filters__weekday ${selectedDays[val]}`}>
            {label}
          </div>
        ))}
      </div>
      <div className="filters__weekdays">
        <div onClick={e => handleDayFilter(e, 'Weekdays')} className={`filters__subject ${selectedDays['Weekdays']}`}>
          وسط هفته
        </div>
        <div onClick={e => handleDayFilter(e, 'Weekend')} className={`filters__subject ${selectedDays['Weekend']}`}>
          آخر هفته
        </div>
      </div>
    </div>
  );
};
const ClassCard = ({ classData }) => {
  const { classImg, age, title, description, teacherImg, teacherName, rating, date, price } = classData;
  return (
    <Link to={`/courses/${classData.id}`}>
      <div className="class-card">
        <div className="class-card-wrapper">
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
                  <Link to={`/public-profile/teacher/${classData.teacherName}`}><img className="class-teacher-card__img" src={teacherImg} alt="" /></Link>
                </div>
                <Link to={`/public-profile/teacher/${classData.teacherName}`}><div className="class-teacher-card__name">{teacherName}</div></Link>
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
      </div>
    </Link>
  );
};

const Filters = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [priceAnchorEl, setPriceAnchorEl] = useState(null);
  const openPrice = Boolean(priceAnchorEl);
  const [ageAnchorEl, setAgeAnchorEl] = useState(null);
  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const category = new URLSearchParams(search).get('category');
  const [activeCategory, setActiveCategory] = useState(category);
  const [age, setAge] = useState('any');
  const [choseAge, setChoseAge] = useState('any');
  const [searchString, setSearchString] = useState('');
  const [queryObject, setQueryObject] = useState(category ? { category: category } : {});
  const [apiLoading, setApiLoading] = useState(false);
  const [classes, setClasses] = useState(classesData);

  const handleFiltersModalClose = () => {
    setOpenFiltersModal(false);
  };

  const [value, setValue] = React.useState([0, 2000000]);
  const [chosePriceValue, setChosePriceValue] = useState([0, 2000000]);

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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);
  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }
  useEffect(() => {
    console.log('url params changes...');
    console.log(paramsToObject(new URLSearchParams(search)));
  }, [search]);

  useEffect(() => {
    history.push({
      search: '?' + new URLSearchParams(queryObject).toString(),
    });
  }, [queryObject]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async (query = queryObject) => {
    setApiLoading(true);
    apiInstance
      .get(
        `${baseUrl}/courses/?price__gte=${query.min_price || ''}&price__lte=${query.max_price || ''}&start_date__gt=${
          query.start_date || ''
        }&start_date__lt=${query.end_date || ''}&age_lte=${query.max_age || ''}&age_gte=${query.min_age || ''}&search=${
          query.search || ''
        }&${query.category ? `categories=${query.category}` : ''}`
      )
      .then(res => {
        console.log(res.data.results, '@@@@@@@');
        setClasses(() =>
          res.data.results.map(classData => ({
            classImg:
              classData.image || 'https://www.inklyo.com/wp-content/uploads/How-to-Succeed-in-an-Online-Course.jpg',
            age: convertNumberToPersian(`${classData.min_age} تا ${classData.max_age} سال`),
            title: classData.title,
            description: classData.description,
            teacherImg:
              (classData.instructor.image && classData.instructor.image.image) ||
              'https://www.pinclipart.com/picdir/middle/148-1486972_mystery-man-avatar-circle-clipart.png',
            teacherName:
              classData.instructor.first_name == 'null' || classData.instructor.last_name == 'null'
                ? classData.instructor.first_name + ' ' + classData.instructor.last_name
                : classData.instructor.username,
            rating: classData.rate,
            date: `از ${convertNumberToPersian(classData.start_date.split('-').join('/'))} تا ${convertNumberToPersian(
              classData.end_date.split('-').join('/')
            )}`,
            price: classData.price,
            id: classData.id,
          }))
        );
        setApiLoading(false);
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>کلاس‌ها</title>
      </Helmet>
      <Navbar color="#fd576c" />
      <div className="filters-page">
        <h1 className="filters-page__title">پیداکردن کلاس مورد نظر</h1>
        <div className="filters">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1024px',
            }}
          >
            <div className="filters__search-wrapper">
              <div
                className="filters__search-icon"
                onClick={() => {
                  setQueryObject(old => ({ ...old, search: searchString }));
                  getClasses();
                }}
              >
                <SearchIcon />
              </div>
              <form
                style={{ width: '100%' }}
                onSubmit={e => {
                  e.preventDefault();
                  setQueryObject(old => ({ ...old, search: searchString }));
                  getClasses();
                }}
              >
                <input
                  style={{ width: '100%' }}
                  value={searchString}
                  onChange={e => {
                    setQueryObject(old => ({ ...old, search: searchString }));
                    setSearchString(e.target.value);
                  }}
                  placeholder="جستجوی در نام کلاس..."
                  className="filters__search-input"
                />
              </form>
            </div>

            {!isMobile && (
              <>
                <button
                  style={{ marginLeft: 16 }}
                  className="success-btn"
                  onClick={() => {
                    getClasses();
                  }}
                >
                  مشاهده دروس
                </button>
                <button
                  className="info-btn"
                  onClick={() => {
                    setAge('any');
                    setChoseAge('any');
                    setSearchString('');
                    setChosePriceValue([0, 200000]);
                    setValue([0, 2000000]);
                    setStartDate(null);
                    setEndDate(null);
                    setActiveCategory(null);
                    setQueryObject({});
                    getClasses({});

                    // handleFiltersModalClose();
                  }}
                >
                  ریست
                </button>
              </>
            )}
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
                        <button
                          className="success-btn"
                          onClick={() => {
                            setQueryObject(old => ({ ...old, min_price: value[0], max_price: value[1] }));
                            setChosePriceValue(value);
                            handlePriceClose();
                          }}
                        >
                          اعمال
                        </button>
                        <button
                          className="info-btn"
                          onClick={() => {
                            setValue(chosePriceValue);
                            handlePriceClose();
                          }}
                        >
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
                      <RadioGroup
                        aria-label="gender"
                        defaultValue="any"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        name="radio-buttons-group"
                      >
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
                        <button
                          className="success-btn"
                          onClick={() => {
                            setChoseAge(age);
                            handleAgeClose();
                            setQueryObject(old => ({
                              ...old,
                              min_age: age == 'any' ? 0 : age.split('-')[0],
                              max_age: age == 'any' ? 18 : age.split('-')[1],
                            }));
                          }}
                        >
                          اعمال
                        </button>
                        <button
                          className="info-btn"
                          onClick={() => {
                            setAge(choseAge);
                            handleAgeClose();
                          }}
                        >
                          بازگشت
                        </button>
                      </div>
                    </div>
                  </Menu>
                </div>

                {/* <div className="filters__filter-wrapper">
                  <div onClick={handleDateClick} className="filters__filter">
                    هر روزی...
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={dateAnchorEl}
                    open={Boolean(dateAnchorEl)}
                    onClose={handleDateClose}
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
                    <AnyDateOrTime />
                  </Menu>
                </div> */}
                <div className="filters__filter-wrapper">
                  <div onClick={() => startDatePickerRef.current.openCalendar()} className="filters__filter">
                    {startDate ? convertNumberToPersian(`از تاریخ:‌ ${startDate.toString()}`) : 'از تاریخ...'}
                  </div>
                </div>
                <div className="filters__filter-wrapper">
                  <div onClick={() => endDatePickerRef.current.openCalendar()} className="filters__filter">
                    {endDate ? convertNumberToPersian(`تا تاریخ: ${endDate.toString()}`) : 'تا تاریخ...'}
                  </div>
                </div>
              </div>
              <div className="filters__subjects">
                <div className="filters__subjects-title">موضوعات: </div>
                {categoryData.map(catData => (
                  <div
                    onClick={() => {
                      setQueryObject(old => ({ ...old, category: catData.id }));
                      setActiveCategory(catData.id);
                    }}
                    className={`filters__subject${catData.id == activeCategory ? ' active' : ''}`}
                  >
                    {catData.title}
                  </div>
                ))}
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
                <RadioGroup
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  aria-label="gender"
                  defaultValue="any"
                  name="radio-buttons-group"
                >
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

              {/* <div style={{ margin: '32px 0' }}>
                <AnyDateOrTime />
              </div> */}
              <div className="filters__filter-wrapper">
                <div onClick={() => startDatePickerRef.current.openCalendar()} className="filters__filter">
                  {startDate ? convertNumberToPersian(`از تاریخ:‌ ${startDate.toString()}`) : 'از تاریخ...'}
                </div>
              </div>
              <div className="filters__filter-wrapper">
                <div onClick={() => endDatePickerRef.current.openCalendar()} className="filters__filter">
                  {endDate ? convertNumberToPersian(`تا تاریخ: ${endDate.toString()}`) : 'تا تاریخ...'}
                </div>
              </div>

              <div style={{ marginTop: 16 }} className="filters__subjects-title">
                موضوعات:
              </div>
              <div className="filters__subjects">
                {categoryData.map(catData => (
                  <div
                    onClick={() => {
                      setQueryObject(old => ({ ...old, category: catData.id }));
                      setActiveCategory(catData.id);
                    }}
                    className={`filters__subject${catData.id == activeCategory ? ' active' : ''}`}
                  >
                    {catData.title}
                  </div>
                ))}
              </div>
              <div style={{ padding: 8, display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
                <button
                  className="success-btn"
                  onClick={() => {
                    setChosePriceValue(value);
                    setChoseAge(age);
                    setQueryObject(old => ({ ...old, min_price: value[0], max_price: value[1] }));
                    getClasses({
                      ...queryObject,
                      min_price: value[0],
                      max_price: value[1],
                      min_age: age == 'any' ? 0 : age.split('-')[0],
                      max_age: age == 'any' ? 18 : age.split('-')[1],
                    });
                    handleFiltersModalClose();
                  }}
                >
                  مشاهده دروس
                </button>
                <button
                  className="info-btn"
                  onClick={() => {
                    setAge('any');
                    setChoseAge('any');
                    setSearchString('');
                    setChosePriceValue([0, 200000]);
                    setValue([0, 2000000]);
                    setStartDate(null);
                    setEndDate(null);
                    setActiveCategory(null);
                    setQueryObject({});
                    // getClasses({});
                    // handleFiltersModalClose();
                  }}
                >
                  ریست
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
        <div style={{ minHeight: 300 }}>
          {apiLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 64 }}>
              <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
            </div>
          )}
          {!apiLoading && (
            <>
              {classes.length == 0 ? (
                <div
                  style={{ display: 'flex', justifyContent: 'center', marginTop: 32, fontSize: 20, fontWeight: 600 }}
                >
                  هیچ کلاسی یافت نشد!
                </div>
              ) : (
                classes.map(classData => <ClassCard classData={classData} />)
              )}
            </>
          )}
        </div>
      </div>
      <div style={{ zIndex: 2000, position: 'relative' }}>
        <DatePicker
          // minDate={new Date()}
          maxDate={endDate}
          ref={startDatePickerRef}
          inputClass="hidden-date-picker"
          className="rmdp-mobile"
          onChange={date => {
            setStartDate(date);
            setQueryObject(old => ({
              ...old,
              start_date: convertNumberToEnglish(date.toString().split('/').join('-')),
            }));
          }}
          calendar={persian}
          locale={persian_fa}
        />
        <DatePicker
          minDate={startDate}
          ref={endDatePickerRef}
          inputClass="hidden-date-picker"
          className="rmdp-mobile"
          onChange={date => {
            setEndDate(date);
            setQueryObject(old => ({ ...old, end_date: convertNumberToEnglish(date.toString().split('/').join('-')) }));
          }}
          calendar={persian}
          locale={persian_fa}
        />
      </div>

      <div style={{ marginTop: 32 }}>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Filters;
