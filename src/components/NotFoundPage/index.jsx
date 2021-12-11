import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../assets/images/404_4.jpg';
import comebackHome from '../../assets/images/comback-home.png';
import './style.scss';

const NotFoundPage = () => (
  <div>
    <div style={{display:"flex", alignItems:"center" , justifyContent:"center", marginTop:"10vmin"}}>
      <img src={notfound} alt="404" />
    </div>
      <h1 className="NotF__Content">اوه! هیچی اینجا نیست...</h1>
    <div className="ComebackHome" style={{display:"flex", alignItems:"center" , justifyContent:"center"}}>
      {/* <img src={comebackHome} alt="404"  /> */}
      {/* <div className="ComebackHome__Content">
        <Link to="/" className="ComebackHome__Content_Sub">
          برگردیم خونه؟
        </Link>
      </div> */}
      <div >
        <Link to="/"><Button className='notfound-button'>بریم خونه</Button></Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
