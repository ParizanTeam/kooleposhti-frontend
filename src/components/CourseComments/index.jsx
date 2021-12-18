import React from 'react';
import CourseComment from './CourseComment';
import CourseAddComment from './CourseAddComment';
import { Divider } from '@mui/material';
import './style.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';

const tmp_comments = [
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
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const token = 'JWT ' + localStorage.getItem('access_token');

  useEffect(() => {
    async function fetchComments() {
      console.log('salam');
      const res = await axios
        .get(`${baseUrl}/courses/${props.course_id}/comments/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          setComments(response.data);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }

    if (refresh) {
      fetchComments();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <React.Fragment>
      <div className="course-comments__card">
        <CourseAddComment course_id={props.course_id} refresh={setRefresh} reply={false} />
        <Divider className="course-comments-divider"></Divider>

        {comments.length !== 0 &&
          comments.map((comment, index) => {
            const studentComment = {
              id: comment.id,
              course_id: props.course_id,
              created_date: comment.created_date,
              username: comment.user.username,
              first_name: comment.user.first_name,
              last_name: comment.user.last_name,
              image: comment.user.image.image,
              comment: comment.text,
            };
            return (
              <CourseComment
                key={index}
                studentComment={studentComment}
                teacherComment={comment.reply}
                refresh={setRefresh}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
}

export default CourseComments;
