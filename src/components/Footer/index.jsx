import footerBg from '../../assets/images/footer-bg.png';
import instagram from '../../assets/images/social/instagram.png';
import email from '../../assets/images/social/email.png';
import whatsapp from '../../assets/images/social/whatsapp.png';
import twitter from '../../assets/images/social/twitter.png';
import phone from '../../assets/images/social/call.png';

import './style.scss';

const Footer = () => {
  return (
    <div
      className="appbarWrapperforfooter"
      style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <img
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
        src={footerBg}
        alt="footer background nature"
      />

      <div className="my-social" style={{ textAlign: 'center' }}>
        <p className="my-footer__content">تماس با ما</p>
        <a href="mailto:contact.kooleposhti@gmail.com">
          <img src={email} alt="email" className="my-social__Icon" />
        </a>
        <a href="https://www.instagram.com/kooleposhti_learning_platform/" target="_blank">
          <img src={instagram} alt="instagram" className="my-social__Icon" />
        </a>
        <a href="https://twitter.com/kooleposhti_edu" target="_blank">
          <img src={twitter} alt="twitter" className="my-social__Icon" />
        </a>
        <a href="https://wa.me/989037505722" target="_blank">
          <img src={whatsapp} alt="whatsapp" className="my-social__Icon" />
        </a>
        <a href="tel:+989037505722">
          <img src={phone} alt="phone" className="my-social__Icon" />
        </a>
      </div>

      <div className="my-footer__bylove">
        <span className="my-footer__content__s">ساخته شده با</span>
        <div className="my-footer__content__h">
          <span>&hearts;</span>
        </div>
        <span className="my-footer__content__s">در ایران</span>
      </div>
    </div>
  );
};
export default Footer;
