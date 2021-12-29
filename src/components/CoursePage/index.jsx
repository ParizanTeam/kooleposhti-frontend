import React, { useState, useRef, useEffect } from 'react';
import { Rating, Typography } from '@mui/material';
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
import { Link, useHistory, useParams } from 'react-router-dom';
import TeacherProfileCard from '../TeacherProfileCard';
import CourseCategory from '../CourseCategory';
import { categoryData } from '../Categories/categoriesData';
import { coursesData } from './coursesData';
import { convertNumberToPersian, formatPrice } from '../../utils/helpers';
import CourseDates from '../CourseDates';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import CourseLoader from '../CourseLoader';
import { Fragment } from 'react';
import apiInstance from '../../utils/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../utils/constants';
import ReactLoading from 'react-loading';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './style.scss';

import skirt from '../../assets/images/skirt.png';
import lip from '../../assets/images/lip.png';
import ketab from '../../assets/images/ketab.png';
import home from '../../assets/images/home.png';
import yummy from '../../assets/images/yummy.png';
import sparkle from '../../assets/images/sparkle.png';
import game from '../../assets/images/game.png';
import nini from '../../assets/images/nini.png';
import olympic from '../../assets/images/olympic.png';
import ship from '../../assets/images/ship.png';
import pets from '../../assets/images/pets.png';

import CourseComments from '../CourseComments';

export const categoriesData = [
  {
    imgSrc: ship,
    title: 'مسافرت',
    color: '#ceaea2',
    theme: 'light',
    id: 1,
  },
  {
    imgSrc: lip,
    title: 'زیبایی',
    color: '#ff80ab',
    theme: 'light',
    id: 2,
  },
  {
    imgSrc: pets,
    title: 'حیوانات',
    color: '#aebac5',
    theme: 'light',
    id: 3,
  },
  {
    imgSrc: game,
    title: 'بازی',
    color: '#ececec',
    theme: 'dark',
    id: 4,
  },
  {
    imgSrc: skirt,
    title: 'مد و لباس',
    color: '#ff979d',
    theme: 'light',
    id: 5,
  },
  {
    imgSrc: ketab,
    title: 'کتاب',
    color: '#d1b9fc',
    theme: 'light',
    id: 6,
  },
  {
    imgSrc: home,
    title: 'ساختن',
    color: '#88bde8',
    theme: 'light',
    id: 7,
  },
  {
    imgSrc: yummy,
    title: 'خوشمزه',
    color: '#ffa588',
    theme: 'light',
    id: 8,
  },
  {
    imgSrc: sparkle,
    title: 'کاردستی',
    color: '#b4f0e1',
    theme: 'dark',
    id: 9,
  },
  {
    imgSrc: nini,
    title: 'نوزاد',
    color: '#ffe3b9',
    theme: 'dark',
    id: 10,
  },
  {
    imgSrc: olympic,
    title: 'ورزشی',
    color: '#e0edff',
    theme: 'dark',
    id: 11,
  },
];

const CoursePage = () => {
  const params = useParams();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const courseId = params.courseId;
  const history = useHistory();
  const datesRef = useRef(null);
  const [showMore, setShowMore] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [codeBlured, setCodeBlured] = useState(false);
  const [price, setPrice] = useState();
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

  let regex = /[^A-Za-z0-9]+/;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setIsLoading(true);
    axios
      .get(`${baseUrl}/courses/${courseId}`)
      .then(res => {
        setData(res.data);
        setPrice(res.data.price);
        console.log(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        // TODO uncomment when done
        history.push('/not-found');
      });
  }, []);

  useEffect(() => {
    apiInstance.get(`${baseUrl}/courses/${courseId}/can-enroll/`).then(res => {
      setShowRegister(res.data.enroll);
      console.log(res.data);
    });
  }, []);

  const register = () => {
    if (!isAuthenticated) {
      toast.error('باید قبلش وارد حسابت بشی.');
      return;
    }
    setRegisterLoading(true);
    apiInstance
      .post(`${baseUrl}/courses/${courseId}/enroll/`)
      .then(res => {
        console.log(res);
        toast.success('با موفقیت ثبت‌نام‌ شدی.');
        setRegisterLoading(false);
        setTimeout(() => {
          history.push(`/dashboard/class/${courseId}`);
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        toast.error('مشکلی در سامانه به وجود اومده.');
        setRegisterLoading(false);
      });
  };

  const discount = () => {
    apiInstance
      .get(`${baseUrl}/discounts/validate?code=${code}&course=${courseId}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div style={{ marginBottom: 72 }}>
        <Navbar color="#fd576c" />
      </div>
      <Fragment>
        <ToastContainer rtl={true} position="bottom-center" />
        {isLoading && <CourseLoader />}
        {!isLoading && (
          <div className="course-page">
            <Helmet>
              <title>{data.title}</title>
            </Helmet>

            <div className="course-header">
              <div className="course-header__first-section-wrapper">
                <div className="course-header__categories">
                  {data.categories.map(category => (
                    <Link to={`/classes?category=${categoriesData[category - 1].id}`}>
                      <CourseCategory
                        color={categoriesData[category - 1].color}
                        imgSrc={categoriesData[category - 1].imgSrc}
                        theme={categoriesData[category - 1].theme}
                        title={categoriesData[category - 1].title}
                      />
                    </Link>
                  ))}
                </div>
                <div className="course-header__title">{data.title}</div>
                <div className="course-header__rating">
                  <Rating
                    size="large"
                    name="customized-color"
                    value={data.rate}
                    precision={0.5}
                    icon={<StarRoundedIcon />}
                    emptyIcon={<StarOutlineRoundedIcon />}
                    readOnly
                  />
                  <span className="course-header__rating--number">{' ' + convertNumberToPersian(data.rate)}</span>
                </div>

                <div className="course-header__description">
                  {data.description.length <= 250 && data.description}
                  {data.description.length > 250 && showMore && data.description.slice(0, 250) + '... '}
                  {data.description.length > 250 && !showMore && data.description}
                  {data.description.length > 250 && (
                    <button className="showmore" onClick={() => setShowMore(state => !state)}>
                      {showMore ? showMoreText : showLessText}
                    </button>
                  )}
                </div>
                <div className="course-header__class-info">
                  <button onClick={scrollToDates} className="course-header__goto-times">
                    مشاهده زمان جلسه‌ها
                  </button>
                  {showRegister && (
                    <button className="course-header__register" onClick={handleOpen}>
                      ثبت‌نام‌ در کلاس
                    </button>
                  )}
                </div>
                <p className="course-header__remain">ظرفیت باقیمانده: {convertNumberToPersian(data.capacity)} نفر</p>
              </div>
              <div className="course-header__img">
                <img
                  src={data.image || 'https://www.inklyo.com/wp-content/uploads/How-to-Succeed-in-an-Online-Course.jpg'}
                  alt=""
                />
              </div>
            </div>
            <div className="course-tags">
              {data.tags.map(
                (tag, i) =>
                  tag.name != '' && (
                    <div className="course-tags__tag" key={i}>
                      {tag.name}
                    </div>
                  )
              )}
            </div>
            <div className="course-info">
              <div className="course-info__item">
                <ScheduleOutlinedIcon />
                <p>{convertNumberToPersian(data.duration)} دقیقه</p>
              </div>
              <div className="course-info__item">
                <PeopleOutlineIcon />
                <p>{convertNumberToPersian(data.max_students)} نفر در هر کلاس</p>
              </div>
              <div className="course-info__item">
                <CakeOutlinedIcon />
                <p>
                  {convertNumberToPersian(data.min_age)} تا {convertNumberToPersian(data.max_age)} ساله‌ها
                </p>
              </div>
              <div className="course-info__item">
                <LocalOfferOutlinedIcon />
                <p>{formatPrice(convertNumberToPersian(data.price))} تومان</p>
              </div>
            </div>

            {data.goals.length > 0 && (
              <div className="course-objectives">
                <p className="course-objectives__title">مهارت‌هایی که در پایان کلاس خواهید آموخت:</p>
                <div className="course-objectives__items">
                  {data.goals.map((goal, i) => (
                    <div className="course-objectives__item">
                      <DoneAllIcon />
                      <p>{goal.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <TeacherProfileCard instructor={data.instructor} />
            <CourseDates ref={datesRef} sessions={data.sessions} />
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
                  <div>
                    <input
                      type="text"
                      placeholder="متن کد تخفیف"
                      onBlur={() => setCodeBlured(true)}
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="kp-text-input__input course-page-input__title"
                      id="title"
                    />
                    {regex.test(code) && (
                      <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>
                        متن کد تخفیف باید تنها از اعداد و الفبای انگلیسی تشکیل شده باشد.
                      </div>
                    )}

                    <button className="register-modal__confirm info-btn" onClick={discount}>
                      اعمال
                    </button>
                  </div>
                  <p>{`هزینه ی کلاس: ${convertNumberToPersian(price)} تومان`}</p>
                  <button className="register-modal__confirm" onClick={register}>
                    ثبت نام
                  </button>
                  <button className="register-modal__cancel" onClick={handleClose}>
                    بازگشت
                  </button>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {registerLoading && <ReactLoading type="bubbles" color="#000" />}
                  </div>
                </div>
              </Fade>
            </Modal>
            <div>
              <Typography className="course-header__title">نظرات شرکت کنندگان:</Typography>
              <CourseComments />
            </div>
          </div>
        )}
      </Fragment>
      <Footer />
    </>
  );
};

export default CoursePage;
