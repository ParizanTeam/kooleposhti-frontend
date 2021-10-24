
import './style.scss';

const Footer= () =>
{
  return(
  <div className = "appbarWrapperforfooter ">
      

      <div className="my-footer">
      <br/><br/>
      <p className="my-footer__content">تماس با ما &#128222;</p>
      <br />
      <p className = "my-footer__phoneNum"> &#9753; 304-256-1776 &#9743;</p>
      <br />
      <p className = "my-footer__phoneNum"> &#9753; 304-256-1740 &#9743;</p>
      </div>

      <div className="my-social">
      <br/><br/>
      <p className="my-footer__content">شبکه‌های اجتماعی &#128241;</p>
      <br />
      <img src= "https://8pic.ir/uploads/outlook-mail-14615.png" alt="SMI" className="my-social__Icon"/>
      <img src= "https://8pic.ir/uploads/paper-plane-send-message-icon-185989.png" alt="SMI" className="my-social__Icon"/>
      <img src= "https://8pic.ir/uploads/send-message-icon-icons-com-52482.png" alt="SMI" className="my-social__Icon"/>
      <img src= "https://8pic.ir/uploads/Twitter-icon-design-with-dark-black-brush-on-transparent-background-PNG.png" alt="SMI" className="my-social__Icon"/>
      <img src= "https://8pic.ir/uploads/scribble-social-instagram-ig-insta-logo-icon-153109.png" alt="SMI" className="my-social__Icon"/>
      </div>

      <div className="my-footer">
      <img src= "https://8pic.ir/uploads/backpack-school.png" alt="footer" className="my-footer__media"/>
      <div className = "my-footer__bylove">
      <span className="my-footer__content__s">در ایران</span>
      <span className="my-footer__content__h">&hearts;</span>
      <span className="my-footer__content__s">ساخته شده با</span>
      </div></div>
    </div>
  );

}
export default Footer;


