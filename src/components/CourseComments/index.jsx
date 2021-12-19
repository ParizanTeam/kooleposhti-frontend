import React from 'react';
import CourseComment from './CourseComment';
import CourseAddComment from './CourseAddComment';
import { Divider, Typography } from '@mui/material';
import './style.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';

function CourseComments(props) {
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [role, setRole] = useState();
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
          console.log(response.data);
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

  useEffect(() => {
    async function check() {
      const res = await axios
        .get(`${baseUrl}/courses/${props.course_id}/role/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response);
          setRole(response.data.role);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }

    check();
  }, []);

  return (
    <React.Fragment>
      <div className="course-comments__card">
        {role === 'student' && <CourseAddComment course_id={props.course_id} refresh={setRefresh} reply={false} />}
        <Divider className="course-comments-divider"></Divider>
        {comments.length === 0 && (
          <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            نظری برای این کلاس ثبت نشده !!!
          </Typography>
        )}
        {comments.length !== 0 &&
          comments.map((comment, index) => {
            const studentComment = {
              id: comment.id,
              course_id: props.course_id,
              created_date: comment.created_date,
              username: comment.user.username,
              first_name: comment.user.first_name,
              last_name: comment.user.last_name,
              image: comment.user.image ? comment.user.image.image : null,
              comment: comment.text,
            };
            return (
              <CourseComment
                key={index}
                studentComment={studentComment}
                teacherComment={comment.reply}
                refresh={setRefresh}
                role={role}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
}

export default CourseComments;
