import AOS from 'aos';
import 'aos/dist/aos.css';
import teamPlay from '../../assets/images/team-play.png';
import problemSolve from '../../assets/images/problem-solve.png';
import discovery from '../../assets/images/discovery.png';
import { useMobile } from '../../utils/detectSource';
import './style.scss';

AOS.init({
  once: true,
});

const HowItWorks = () => {
  return (
    <div className="why-section">
      <h2 className="why-section__title">
        <span className="why-section__highlight">چرا</span> کوله‌پشتی؟
      </h2>
      <div className="appbarWrapper ">
        <div
          className="why-card"
          data-aos-offset="50"
          data-aos={useMobile() ? 'fade-up' : 'fade-left'}
          data-aos-duration="2000"
        >
          <img src={problemSolve} alt="HIWmedia" className="why-card__img" />
          <p className="why-card__title">تقویت قدرت حل مسئله</p>
          <p className="why-card__content">
            با شرکت توی کلاس‌ها و چالش‌های مختلف، میتونی مهارت حل مسئلت رو افزایش بدی!
          </p>
        </div>

        <div className="why-card" data-aos-offset="50" data-aos="fade-up" data-aos-duration="2000">
          <img src={discovery} alt="HIWmedia" className="why-card__img" />
          <p className="why-card__title">کشف و جستجوی استعدادها</p>
          <p className="why-card__content">با جستجو و شرکت‌کردن توی کلاس‌های مختلف، میتونی استعدادت رو کشف کنی!</p>
        </div>

        <div
          className="why-card"
          data-aos-offset="50"
          data-aos={useMobile() ? 'fade-up' : 'fade-right'}
          data-aos-duration="2000"
        >
          <img src={teamPlay} alt="HIWmedia" className="why-card__img" />
          <p className="why-card__title">بازی‌های جذاب و گروهی</p>
          <p className="why-card__content">کلاس‌ها به صورت گروهیه و میتونی با بقیه بچه‌ها ارتباط برقرار کنی!</p>
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
