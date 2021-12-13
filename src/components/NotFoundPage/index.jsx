import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../assets/images/notfound.jpg';
import comebackHome from '../../assets/images/comback-home.png';
import './style.scss';
import Navbar from '../Navbar';

const NotFoundPage = () => (
  <div>
    <Navbar color='#59127a'/>
    <div className="back">
      <div className="NotF">
        <img src={notfound} alt="404" className="NotF__Media" />
        <h1 className="NotF__Content">اوه! هیچی اینجا نیست...</h1>
      </div>
      <div className="ComebackHome">
        <img src={comebackHome} alt="404" className="ComebackHome__Media" />
        <div className="ComebackHome__Content">
        <Link to="/" className="ComebackHome__Content_Sub">برگردیم خونه؟</Link></div>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
