import React from 'react';
import CourseComment from './CourseComment';
import CourseAddComment from './CourseAddComment';
import { Divider } from '@mui/material';
import './style.scss';

function CourseComments(props) {
  return (
    <React.Fragment>
      <div className="course-comments__card">
        <CourseAddComment />
        <Divider className='course-comments-divider'></Divider>
        <CourseComment />
      </div>
    </React.Fragment>
  );
}

export default CourseComments;
