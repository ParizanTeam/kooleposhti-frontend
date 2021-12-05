import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { convertNumberToPersian } from '../../../utils/helpers';
import avatar from '../../../assets/images/profile_2.png';
import './style.scss';

function CourseCommentStudent(props) {
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
                  سید عماد موسوی
                </Typography>
              </Grid>
              <Grid item xs={12} mt={1}>
                <Typography className="course-comment-student__date">
                  {convertNumberToPersian('1400/06/10 5:24:12')}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={3} className="course-comment-student__text">
                سلام به همه عزیزان من این کلاس رو شرکت کردم و بسیار راضی هستم. خدایی تیم پاریزان عالی کار کردند و سایت
                خفن کوله پشتی رو نوشتند و من که خیلی با این سایت حال میکنم این کلاس رو هم از دو هفته پیش که ثبت نام کردم
                تا حالا راضی هستم و مدرس این دوره بسیار حرفه ای عمل میکنه .
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseCommentStudent;
