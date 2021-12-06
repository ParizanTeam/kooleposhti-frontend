import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ServiceUnavailable = () => (
  <div className = 'SUback'>
    <div className = 'SU'>
    <div className='SUNUM'>
    <h1>!503</h1></div>
    <img src="https://8pic.ir/uploads/SADNESS-Fullbody-Render.png" alt="404" className = 'SU__Media'/>
    <div className = 'SU__Content'>
    <h1> متاسفیم...</h1><br/>
    <h1>نتونستیم صفحه‌ای که میخوای رو بیاریم</h1>
    </div>
    </div>
    <div className = 'SUComebackHome'>
    <img src="https://8pic.ir/uploads/PngItem-511827.png" alt="404" className = 'SUComebackHome__Media'/>
    <Link to="/">برگردیم خونه؟</Link>
    </div>
  </div>
);

export default ServiceUnavailable;
