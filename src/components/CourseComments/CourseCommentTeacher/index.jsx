import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { convertNumberToPersian } from '../../../utils/helpers';
import avatar from '../../../assets/images/profile_2.png';
import './style.scss';

function CourseCommentTeacher(props) {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={11} xs={12}>
          <div className="course-comment-teacher__card">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body4" className="course-comment-teacher__name">
                  {props.comment ? props.comment.username: "نام کاربری وجود ندارد"}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={1}>
                <Typography className="course-comment-teacher__date">{convertNumberToPersian(props.comment ? props.comment.date : "تاریخی وجود ندارد")}</Typography>
              </Grid>
              <Grid item xs={12} mt={3} className="course-comment-teacher__text">
                {props.comment ? props.comment.text : "پیامی وجود ندارد"}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={1} xs={0} sx={{ display: { sm: 'flex', xs: 'none' }, flexDirection: 'column' }} md={1}>
          <Avatar className="comment-avatar" src={avatar} alt="avatar" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseCommentTeacher;
