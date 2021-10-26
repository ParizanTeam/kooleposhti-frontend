import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const NotFoundPage = () => (
  <div className = 'back'>
    <div className = 'NotF'>
    <img src="https://8pic.ir/uploads/404-boo-pic.jpg" alt="404" className = 'NotF__Media'/>
    <div className = 'NotF__Content'>
    <h1>اوه! هیچی اینجا نیست...</h1></div>
    </div>
    <div className = 'ComebackHome'>
    <img src="https://8pic.ir/uploads/PngItem-5957531.png" alt="404" className = 'ComebackHome__Media'/>
    <Link to="/">برگردیم خونه؟</Link>
    </div>
  </div>
);

export default NotFoundPage;
