import React from 'react';
import CourseCommentStudent from './CourseCommentStudent';
import CourseCommentTeacher from './CourseCommentTeacher';
import CourseAddComment from './CourseAddComment';
import { Divider } from '@mui/material';
import './style.scss';

function CourseComments(props) {
  return (
    <React.Fragment>
      <div className="course-comments__card">
        <CourseAddComment />
        <Divider className='course-comments-divider'></Divider>
        <CourseCommentStudent />
        <CourseCommentTeacher />
        <CourseCommentStudent />
        <CourseCommentTeacher />
        <CourseCommentStudent />
      </div>
    </React.Fragment>
  );
}

export default CourseComments;
