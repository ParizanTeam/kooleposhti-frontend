import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const NotFoundPage = () => (
  <div>
    <h1>۴۰۴ - صفحه مورد نظر یافت نشد</h1>
    <Link to="/">بازگشت به خانه</Link>
  </div>
);

export default NotFoundPage;
