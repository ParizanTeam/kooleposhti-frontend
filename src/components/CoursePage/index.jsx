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
    title: '????????????',
    color: '#ceaea2',
    theme: 'light',
    id: 1,
  },
  {
    imgSrc: lip,
    title: '????????????',
    color: '#ff80ab',
    theme: 'light',
    id: 2,
  },
  {
    imgSrc: pets,
    title: '??????????????',
    color: '#aebac5',
    theme: 'light',
    id: 3,
  },
  {
    imgSrc: game,
    title: '????????',
    color: '#ececec',
    theme: 'dark',
    id: 4,
  },
  {
    imgSrc: skirt,
    title: '???? ?? ????????',
    color: '#ff979d',
    theme: 'light',
    id: 5,
  },
  {
    imgSrc: ketab,
    title: '????????',
    color: '#d1b9fc',
    theme: 'light',
    id: 6,
  },
  {
    imgSrc: home,
    title: '??????????',
    color: '#88bde8',
    theme: 'light',
    id: 7,
  },
  {
    imgSrc: yummy,
    title: '????????????',
    color: '#ffa588',
    theme: 'light',
    id: 8,
  },
  {
    imgSrc: sparkle,
    title: '??????????????',
    color: '#b4f0e1',
    theme: 'dark',
    id: 9,
  },
  {
    imgSrc: nini,
    title: '??????????',
    color: '#ffe3b9',
    theme: 'dark',
    id: 10,
  },
  {
    imgSrc: olympic,
    title: '??????????',
    color: '#e0edff',
    theme: 'dark',
    id: 11,
  },
];

const CoursePage = () => {
  const params = useParams();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth);

  const courseId = params.courseId;
  const history = useHistory();
  const datesRef = useRef(null);
  const [showMore, setShowMore] = useState(true);
  const [data, setData] = useState(null);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [rate, setRate] = useState(null);
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [correctCode, setCorrectCode] = useState('');
  const [codeBlured, setCodeBlured] = useState(false);
  const [price, setPrice] = useState();
  const [initialPrice, setInitialPrice] = useState();
  const [useDiscount, setUseDiscount] = useState(false);
  const [lastPrice, setLastPrice] = useState();
  const handleOpen = () => {
    if (isAuthenticated && (!user.first_name || !user.last_name))
      toast.error('?????? ?????? ?????? ???????? ?????????????? ?????? ???? ???? ???????? ?????????????? ?????????? ????????');
    else setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const showMoreText = '?????????? ??????????...';
  const showLessText = '?????????? ????????...';
  const teacherName = '?????????? ??????????';
  const teacherTitle = '???????????? ???????? ???? ???????? ????????????????';
  const teacherImgSrc = 'https://randomuser.me/api/portraits/men/51.jpg';
  const teacherDescription =
    '?????????? ?????????????? ???????????? ???????????????? ???? ?????????????? ?????????????????????? ???????????????. ???? ???? ?????? ???????? ???????? ???? ?????????? ????????????????????????? ???? ???????????? ????????????? ?? ??????????????? ?????????? ???? ?????? ?????????? ????????.';

  const tags = ['????????????', '????????????', '??????????', '?????? ??????????'];
  const scrollToDates = () => {
    window.scrollTo({
      top: datesRef.current.getBoundingClientRect().top + window.pageYOffset - 100,
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
        setInitialPrice(res.data.price);
        setLastPrice(res.data.price);
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
    apiInstance.get(`${baseUrl}/courses/${courseId}/role/`).then(res => {
      console.log('rolllle ', res.data);
      setRole(res.data.role);
    });
  }, []);

  useEffect(() => {
    apiInstance.get(`${baseUrl}/courses/${courseId}/can-enroll/`).then(res => {
      setShowRegister(res.data.enroll);
      setEnrolled(res.data.enrolled);
      setRate(res.data.rate);
      console.log('ressssssssss: ', res.data);
    });
  }, []);

  const register = () => {
    if (!isAuthenticated) {
      toast.error('???????? ???????? ???????? ?????????? ??????.');
      return;
    }
    const data = {
      code: correctCode,
      // course_pk: +courseId,
    };
    console.log(data);
    setRegisterLoading(true);
    apiInstance
      .post(`${baseUrl}/courses/${courseId}/enroll/`, data)
      // .post(`${baseUrl}/accounts/students/enroll/`, data)
      .then(res => {
        console.log(res);
        toast.success(
          `???? ???????????? ?????????????????? ??????. ?????????? ${convertNumberToPersian(formatPrice(price))}?????????? ???? ?????????? ???? ????.`
        );
        setRegisterLoading(false);
        setTimeout(() => {
          history.push(`/dashboard/class/${courseId}`);
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        toast.error('?????????? ???? ???????????? ???? ???????? ??????????.');
        setRegisterLoading(false);
      });
  };

  const discount = () => {
    setDiscountLoading(true);
    apiInstance
      .get(`${baseUrl}/discounts/validate?code=${code}&course=${courseId}`)
      .then(res => {
        console.log(res);
        setPrice(((100 - res.data.discount) / 100) * initialPrice);
        setCorrectCode(code);
        setUseDiscount(true);
        console.log(price);
        setDiscountLoading(false);
      })
      .catch(err => {
        console.log(err);
        setUseDiscount(false);
        setPrice(initialPrice);
        setDiscountLoading(false);
        console.log('result is :' + err);
        if (err.response) {
          if (err.response.status == '403') {
            toast.error('???????????????? ???? ???????????? ???? ?????? ?????????? ???? ?????????? ?????? ????????.');
          } else if (err.response.status == '410') {
            toast.error('???????????????? ?????? ???? ?????????? ?????????? ???????? ??????.');
          }
        }
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
                    ???????????? ???????? ???????????????
                  </button>
                  {(enrolled || role === 'teacher') && (
                    <button
                      onClick={() => {
                        history.push(`/dashboard/class/${courseId}`);
                      }}
                      className="course-header__goto-class orange-btn"
                    >
                      ???????? ???? ???????? ????????
                    </button>
                  )}
                  {showRegister && data.capacity > 0 && (
                    <button className="course-header__register" onClick={handleOpen}>
                      ?????????????????? ???? ????????
                    </button>
                  )}
                </div>
                <p className="course-header__remain">?????????? ??????????????????: {convertNumberToPersian(data.capacity)} ??????</p>
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
                <p>{convertNumberToPersian(data.duration)} ??????????</p>
              </div>
              <div className="course-info__item">
                <PeopleOutlineIcon />
                <p>{convertNumberToPersian(data.max_students)} ?????? ???? ???? ????????</p>
              </div>
              <div className="course-info__item">
                <CakeOutlinedIcon />
                <p>
                  {convertNumberToPersian(data.min_age)} ???? {convertNumberToPersian(data.max_age)} ???????????????
                </p>
              </div>
              <div className="course-info__item">
                <LocalOfferOutlinedIcon />
                <p>{formatPrice(convertNumberToPersian(data.price))} ??????????</p>
              </div>
            </div>

            {data.goals.length > 0 && (
              <div className="course-objectives">
                <p className="course-objectives__title">????????????????????? ???? ???? ?????????? ???????? ???????????? ??????????:</p>
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
                  {isAuthenticated && (
                    <>
                      <h4 className="register-modal__title">?????? ???? ???????? ?????? ?????? ???????? ??????????????</h4>
                      <div>
                        <input
                          type="text"
                          placeholder="?????? ???? ??????????"
                          onBlur={() => setCodeBlured(true)}
                          value={code}
                          onChange={e => setCode(e.target.value)}
                          className="kp-text-input__input course-page-input__title"
                          id="title"
                        />
                        {regex.test(code) && (
                          <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>
                            ?????? ???? ?????????? ???????? ???????? ???? ?????????? ?? ???????????? ?????????????? ?????????? ?????? ????????.
                          </div>
                        )}

                        <button className="register-modal__confirm info-btn" onClick={discount}>
                          {!discountLoading && <span>??????????</span>}
                          {discountLoading && (
                            <ReactLoading type="bubbles" color="#fff" className="register-modal__discount-button" />
                          )}
                        </button>
                      </div>
                      {useDiscount && (
                        <p className="register-modal__last-price-text">{`?????????? ?? ????????: ${formatPrice(
                          convertNumberToPersian(lastPrice)
                        )} ??????????`}</p>
                      )}
                      <p className="register-modal__price-text">{`?????????? ?? ????????: ${formatPrice(
                        convertNumberToPersian(price)
                      )} ??????????`}</p>
                      <button className="register-modal__confirm" onClick={register}>
                        ?????? ??????
                      </button>
                      <button className="register-modal__cancel" onClick={handleClose}>
                        ????????????
                      </button>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {registerLoading && <ReactLoading type="bubbles" color="#000" />}
                      </div>
                    </>
                  )}
                  {!isAuthenticated && (
                    <>
                      <h4 className="register-modal__title">
                        ???????? ??????????????? ???? ???????? ?????????? ???????? ???????? ???????? ???????????? ?????? ????????.
                      </h4>
                      <button className="register-modal__confirm" onClick={() => history.push('/login')}>
                        ????????
                      </button>
                      <button className="register-modal__cancel" onClick={handleClose}>
                        ????????????
                      </button>
                    </>
                  )}
                </div>
              </Fade>
            </Modal>
            <div>
              <Typography className="course-header__title">?????????? ?????????????????????????:</Typography>
              <CourseComments enrolled={enrolled} rate={rate} course_id={courseId} />
            </div>
          </div>
        )}
      </Fragment>
      <Footer />
    </>
  );
};

export default CoursePage;
