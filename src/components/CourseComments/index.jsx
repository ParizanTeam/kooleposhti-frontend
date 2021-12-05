import React from 'react';
import CourseCommentStudent from './CourseCommentStudent';
import CourseCommentTeacher from './CourseCommentTeacher';
import './style.scss';

function CourseComments(props) {
  return (
    <React.Fragment>
      <div className="course-comments__card">
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
