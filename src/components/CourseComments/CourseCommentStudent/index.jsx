import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { convertNumberToPersian } from '../../../utils/helpers';
import avatar from '../../../assets/images/profile_2.png';
import './style.scss';

function CourseCommentStudent(props) {
  console.log(props.comment);
  console.log('username is:' + props.comment.username);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={1} xs={0} sx={{ display: { sm: 'flex', xs: 'none' }, flexDirection: 'column' }} md={1}>
          <Avatar className="comment-avatar" src={avatar} alt="avatar" />
        </Grid>
        <Grid item sm={11} xs={12}>
          <div className="course-comment-student__card">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body4" className="course-comment-student__name">
                  {props.comment.username}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={1}>
                <Typography className="course-comment-student__date">
                  {convertNumberToPersian(props.comment.date)}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={3} className="course-comment-student__text">
                {props.comment.text}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseCommentStudent;
