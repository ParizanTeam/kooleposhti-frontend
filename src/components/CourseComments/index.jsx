import React from 'react';
import CourseComment from './CourseComment';
import CourseAddComment from './CourseAddComment';
import { Divider } from '@mui/material';
import './style.scss';

const firstComments = [
  {
    StudentComment: {
      date: '1397',
      text:
        'لام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'emad',
    },
    teacherComment: {
      date: '1356',
      text:
        'لام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'emad',
    },
  },
  {
    studentComment: {
      date: '654',
      text:
        'لام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'emad',
    },
    teacherComment: {
      date: '654',
      text:
        'لام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'emad',
    },
  },
  {
    StudentComment: {
      date: '9846',
      text:
        'لام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'emad',
    },
    teacherComment: {
      date: '9875',
      text:
        'لام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'emad',
    },
  },
];

function CourseComments(props) {
  return (
    <React.Fragment>
      <div className="course-comments__card">
        <CourseAddComment />
        <Divider className="course-comments-divider"></Divider>
        {/* <CourseComment /> */}
        {firstComments.map(comment => (
          <CourseComment studentComment={comment.studentComment} teacherComment={comment.teacherComment} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default CourseComments;
