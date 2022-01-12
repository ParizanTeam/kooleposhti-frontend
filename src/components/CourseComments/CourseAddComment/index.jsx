import { react, Fragment, useEffect } from 'react';
import { Avatar, Grid, Typography, TextField, Button } from '@mui/material';
import { convertNumberToPersian } from '../../../utils/helpers';
import avatar from '../../../assets/images/profile_2.png';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';
import './style.scss';
import ReactLoading from 'react-loading';
import { useRef } from 'react';
import { useState } from 'react';

const CourseAddComment = props => {
  const comment = useRef();
  const [loading, setLoading] = useState(false);
  const token = 'JWT ' + localStorage.getItem('access_token');

  useEffect(()=>{
    if(props.edit_mode)
    {
      comment.current.value = props.comment
    }

  },[])

  const sendComment = async () => {
    setLoading(true);
    const body = { text: comment.current.value };
    if (!props.reply) {
      const res = await axios
        .post(`${baseUrl}/courses/${props.course_id}/comments/`, body, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          setTimeout(() => {
            props.refresh(true);
            setLoading(false);
          }, 500);
          comment.current.value = "";
        })
        .catch(err => {
          console.log('error: ', err);
          setLoading(false);
        });
    } else {
      if (!props.edit_mode) {
        const res = await axios
          .post(`${baseUrl}/courses/${props.course_id}/comments/${props.comment_id}/reply/`, body, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            setTimeout(() => {
              props.refresh(true);
              setLoading(false);
              props.onReplyDone();
            }, 100);
          })
          .catch(err => {
            console.log('error: ', err);
            setLoading(false);
          });
      } else {
        const res = await axios
          .put(`${baseUrl}/courses/${props.course_id}/comments/${props.comment_id}/reply/${props.reply_id}/`, body, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            setTimeout(() => {
              props.refresh(true);
              setLoading(false);
              props.onReplyDone();
            }, 100);
          })
          .catch(err => {
            console.log('error: ', err);
            setLoading(false);
          });
      }
    }
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item sm={1} xs={0} md={1} className="course-add-comment-image__container">
          <Avatar xs={0} src={avatar} alt="avatar" className="course-add-comment-image" />
        </Grid>
        <Grid item container xs={12} sm={11} md={11} >
        <Grid item className="course-add-comment-textField__container" md={12} sm={12} xs={12} sx={{pr:0}}>
        <TextField
            fullWidth
            className="CourseAddComment-textField"
            placeholder="نظر خود را در مورد این کلاس بنویسید."
            multiline
            inputRef={comment}
            inputProps={{ maxLength: 1000 }}
          ></TextField>
        </Grid>
        <Grid
          md={12}
          sm={12}
          xs={12}
          item
          className="course-add-comment-button__container"
          //sx={{ mr: { xl: '2.5vmin', lg: '4vmin', md: '4.5vmin', sm: '3vmin', xs: '-3vmin' } }}
          >
          <Button type="submit" variant="contained" className="course-add-comment-button" onClick={sendComment}>
            {!loading && <span>ارسال نظر</span>}
            {loading && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
          </Button>
        </Grid>
          </Grid>
      </Grid>
    </Fragment>
  );
};

export default CourseAddComment;
