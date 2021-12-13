import React from 'react';
import CourseComment from './CourseComment';
import CourseAddComment from './CourseAddComment';
import { Divider } from '@mui/material';
import './style.scss';

const comments = [
  {
    studentComment: {
      date: '1400/10/05  12:52',
      text:
        'سلام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'سید عماد موسوی',
    },
    teacherComment: null,
  },
  {
    studentComment: {
      date: '1400/10/05  17:22',
      text:
        'سلام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'سید عماد موسوی',
    },
    teacherComment: {
      date: '1400/10/05  8:32',
      text:
        'سلام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'سید عماد موسوی',
    },
  },
  {
    studentComment: {
      date: '1400/8/15  18:22',
      text:
        'سلام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'سید عماد موسوی',
    },
    teacherComment: {
      date: '1400/2/07  2:20',
      text:
        'سلام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .',
      username: 'سید عماد موسوی',
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
        {comments.map((comment, index) => (
          <CourseComment key={index} studentComment={comment.studentComment} teacherComment={comment.teacherComment} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default CourseComments;
