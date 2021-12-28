import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import notfound2 from '../../assets/images/child_404.png';
import './style.scss';

const NewNotFoundPage = () => (
  <>
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 8 }}
    >
      <img src={notfound2} alt="404" style={{ width: 400, maxWidth: '100%' }} />
      <h1 className="NotF__Content">اوه! هیچی اینجا نیست...</h1>
      <Link to="/">
        <Button className="notfound-button">بریم خونه</Button>
      </Link>
    </div>
  </>
);

export default NewNotFoundPage;
