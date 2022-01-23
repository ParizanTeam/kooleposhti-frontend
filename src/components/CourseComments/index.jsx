import React from 'react';
import CourseComment from './CourseComment';
import CourseAddComment from './CourseAddComment';
import { Divider, Rating, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import './style.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { baseUrl } from '../../utils/constants';
import { convertNumberToPersian } from '../../utils/helpers';
import apiInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

function CourseComments(props) {
  const { enrolled, rate } = props;
  console.log('rate:::::::::: ', rate);
  const [rateValue, setRateValue] = useState(rate);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  const [rateLoading, setRateLoading] = useState(false);
  const token = 'JWT ' + localStorage.getItem('access_token');

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      setTimeout(() => {
        console.log('');
      }, 200000);
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
      setLoading(false);
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
          setRole(response.data.role);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }

    check();
  }, []);

  const handleRateSubmit = () => {
    setRateLoading(true);
    apiInstance
      .post(`${baseUrl}/courses/${props.course_id}/rate/`, { rate: rateValue })
      .then(res => {
        toast.success('امتیاز شما با موفقیت ثبت شد.');
        setRateLoading(false);
      })
      .catch(err => {
        console.log(err);
        toast.error('مشکلی در سامانه به وجود آمده‌است.');
        setRateLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div className="course-comments__card">
        {loading && (
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} className="comment-loading" />
        )}
        {!loading && (
          <div>
            {enrolled && (
              <div className="course-comments__rate-section">
                <p>امتیاز دادن به کلاس:</p>
                <div className="course-comments__rate-btn-wrapper">
                  <div
                    className="course-comments__rating-wrapper"
                    style={{ direction: 'ltr', display: 'flex', alignItems: 'flex-start' }}
                  >
                    <Rating
                      name="simple-controlled"
                      size={'large'}
                      icon={<StarRoundedIcon />}
                      emptyIcon={<StarOutlineRoundedIcon />}
                      value={rateValue}
                      onChange={(event, newValue) => {
                        setRateValue(newValue);
                      }}
                    />
                    <span className="course-comments__rating-number">
                      {' ' + convertNumberToPersian(rateValue || 0)}
                    </span>
                  </div>
                  <button onClick={handleRateSubmit} className="yellow-btn course-comments__submit-rate">
                    {rateLoading ? <ReactLoading type="bubbles" color="#fff" className="loading-rate" /> : 'ثبت امتیاز'}
                  </button>
                </div>
              </div>
            )}

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
        )}
      </div>
    </React.Fragment>
  );
}

export default CourseComments;
