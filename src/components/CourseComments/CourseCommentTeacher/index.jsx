import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { convertNumberToPersian } from '../../../utils/helpers';
import avatar from '../../../assets/images/profile_2.png';
import './style.scss';

function CourseCommentTeacher(props) {
  const date = props.info !== null ? new Date(props.info.created_date) : null;
  return (
    <React.Fragment>
      {props.info && (
        <div>
          <Grid container>
            <Grid item sm={11} xs={12}>
              <div className="course-comment-teacher__card">
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body4" className="course-comment-teacher__name">
                      {props.info
                        ? `${props.info.user.first_name} ${props.info.user.last_name}`
                        : 'نام کاربری وجود ندارد'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <Typography className="course-comment-teacher__date">
                      {date !== null &&`${convertNumberToPersian(date.getHours())}:${convertNumberToPersian(date.getMinutes())}`}
                      <span> </span>
                      {date !== null && `${convertNumberToPersian(date.getFullYear())}/${convertNumberToPersian(
                        date.getMonth()
                      )}/${convertNumberToPersian(date.getDate())}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mt={3} className="course-comment-teacher__text">
                    {props.info ? props.info.text : ''}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item sm={1} xs={0} sx={{ display: { sm: 'flex', xs: 'none' }, flexDirection: 'column' }} md={1}>
              <Avatar
                className="comment-avatar"
                src={props.info && props.info.user && props.info.user.image ? props.info.user.image.image : avatar}
                alt="avatar"
              />
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
}

export default CourseCommentTeacher;
