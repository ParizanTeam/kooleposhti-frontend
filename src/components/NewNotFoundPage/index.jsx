import { Avatar, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../assets/images/404_4.jpg';
import notfound2 from '../../assets/images/child_404.png'
import comebackHome from '../../assets/images/comback-home.png';
import './style.scss';

const NewNotFoundPage = () => (
  <div>
    <div style={{display:"flex", alignItems:"center" , justifyContent:"center", marginTop:"10vmin"}}>
      <Avatar src={notfound2} alt="404" sx={{borderRadius:"0px", width:{lg:"600px",md:"500px",sm:"400px",xs:"300px"}, height:"auto"}}/>
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

export default NewNotFoundPage;