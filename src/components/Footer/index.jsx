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
        <img src={email} alt="SMI" className="my-social__Icon" />
        <img src={instagram} alt="SMI" className="my-social__Icon" />
        <img src={twitter} alt="SMI" className="my-social__Icon" />
        <img src={whatsapp} alt="SMI" className="my-social__Icon" />
        <img src={phone} alt="SMI" className="my-social__Icon" />
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
