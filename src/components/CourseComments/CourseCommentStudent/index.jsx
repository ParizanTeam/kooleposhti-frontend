import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { convertNumberToPersian } from '../../../utils/helpers';
import avatar from '../../../assets/images/profile_2.png';
import './style.scss';

function CourseCommentStudent(props) {
  const date = new Date(props.info.created_date);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={1} xs={0} sx={{ display: { sm: 'flex', xs: 'none' }, flexDirection: 'column' }} md={1}>
          <Avatar
            className="comment-avatar"
            src={props.info.image ? props.info.image : avatar}
            alt="avatar"
          />
        </Grid>
        <Grid item sm={11} xs={12}>
          <div className="course-comment-student__card">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body4" className="course-comment-student__name">
                  {`${props.info.first_name} ${props.info.last_name}`}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={1}>
                <Typography className="course-comment-student__date">
                {`${convertNumberToPersian(date.getHours())}:${convertNumberToPersian(date.getMinutes())}`}
                  <span> </span>
                  {`${convertNumberToPersian(date.getFullYear())}/${convertNumberToPersian(date.getMonth())}/${convertNumberToPersian(date.getDate())}`}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={3} className="course-comment-student__text">
                {props.info.comment}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseCommentStudent;
