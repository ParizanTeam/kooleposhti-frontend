//import { useMobile } from '../../utils/detectSource';
import StudentDashboardHeader from '../StudentDashboardHeader';
import ReactLoading from 'react-loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Keyboard } from 'swiper/core';
import CourseCard from '../CourseCard';
import { useMobile } from '../../utils/detectSource';
import { coursesData } from './coursesData.js';
import 'swiper/swiper-bundle.min.css';
import './style.scss';
import StudentDashboardFooter from '../StudentDashboardHeader/StudentDashboardFooter';
import { useSelector } from 'react-redux';
//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import './style.scss';
import { useMediaQuery } from '@mui/material';
import axios from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { change_profile_color } from '../../store/actions';
import noPersonImg from '../../assets/images/noperson.png';

SwiperCore.use([Navigation, Keyboard]);
const StudentDashboardBookMarkedClasses = () => {
  const themeProps = useSelector(state => state.theme);
  let theNewone = localStorage.getItem('chosenColor');
  change_profile_color(theNewone);
  const [loading, setLoading] = React.useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [favorites, setfavorites] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${baseUrl}/accounts/students/favorites/`)
        .then(res => {
          setfavorites(res.data);
          console.log('favorite classes', res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
    fetchData();
  }, []);
  change_profile_color(theNewone);
  return (
    <div>
      <StudentDashboardHeader />
      <img src={themeProps.btnLabel} alt="bm" className="bmImg" />
      <br />
      <br />
      <div className="afterMyC-a">
        <div className="My-courses-section">
          <h2 className="My-courses-section__title">
            مورد <span className="My-courses-section__highlight"> &#x2665; </span>ها
          </h2>
          <div className="My-carousal-container">
            {loading ? (
              <div className='make-center'>
                <ReactLoading type="spinningBubbles" color={themeProps.primaryColor} height={100} width={100} />{' '}
              </div>
            ) : (
              <div style={{ width: isMobile ? '100%' : '90%' }}>
                {favorites.length === 0 && <h3> با زدن رو قلب درس ها میتونی اونا رو به اینجا اضافه کنی😉</h3>}
                <Swiper
                  spaceBetween={10}
                  slidesPerView={'auto'}
                  centeredSlides
                  navigation={isMobile || favorites.length <= 1 ? false : true}
                  keyboard
                >
                  {favorites.map(item => (
                    <SwiperSlide key={item.id}>
                      <CourseCard
                        id={item.id}
                        username={item.instructor.username}
                        title={item.title}
                        teacherName={item.instructor.first_name + ' ' + item.instructor.last_name}
                        rate={item.rate}
                        teacherImgSrc={(item.instructor.image && baseUrl + item.instructor.image) || noPersonImg}
                        imgSrc={
                          (item.image && baseUrl + item.image) ||
                          'https://www.inklyo.com/wp-content/uploads/How-to-Succeed-in-an-Online-Course.jpg'
                        }
                        isCFavorite={item.is_favorite}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
      <StudentDashboardFooter  styles={(loading || favorites.length===0)?{position:'absolute'}:{}}/>
    </div>
  );
};
export default StudentDashboardBookMarkedClasses;
