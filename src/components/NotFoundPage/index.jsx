import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../assets/images/notfound.jpg';
import comebackHome from '../../assets/images/comback-home.png';
import './style.scss';

const NotFoundPage = () => (
  <div className="back">
    <div className="NotF">
      <img src={notfound} alt="404" className="NotF__Media" />
      <h1 className="NotF__Content">اوه! هیچی اینجا نیست...</h1>
    </div>
    <div className="ComebackHome">
      <img src={comebackHome} alt="404" className="ComebackHome__Media" />
      <Link to="/">برگردیم خونه؟</Link>
    </div>
  </div>
);

export default NotFoundPage;
