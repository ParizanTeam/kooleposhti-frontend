import { react, Fragment } from 'react';
import { Avatar, Grid, Typography, TextField, Button } from '@mui/material';
import { convertNumberToPersian } from '../../../utils/helpers';
import avatar from '../../../assets/images/profile_2.png';
import './style.scss';

const CourseAddComment = (props) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item sm={1} xs={0} md={1} className="course-add-comment-image__container">
          <Avatar xs={0} src={avatar} alt="avatar" className="course-add-comment-image" />
        </Grid>
        <Grid item xs={12} sm={11} md={11} className="course-add-comment-textField__container">
          <TextField
            fullWidth
            className="CourseAddComment-textField"
            placeholder="نظر خود را در مورد این کلاس بنویسید."
            multiline
          ></TextField>
        </Grid>
        <Grid xs={12} item className="course-add-comment-button__container" sx={{ mr: {xl:"2.5vmin" , lg:"4vmin", md:"4.5vmin", sm:"3vmin", xs:"-3vmin" } }}>
          <Button type="submit" variant="contained" className="course-add-comment-button" onClick={props.onClick}>
            ارسال نظر
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CourseAddComment;
