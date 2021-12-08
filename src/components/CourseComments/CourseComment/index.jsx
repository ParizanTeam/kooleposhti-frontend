import React, { useState } from 'react';
import CourseCommentStudent from '../CourseCommentStudent';
import CourseCommentTeacher from '../CourseCommentTeacher';
import CourseAddComment from '../CourseAddComment';
import { Grid, Button } from '@mui/material';
import './style.scss';

function CourseComment(props) {
  const [replybutton, setReplyButton] = useState(true);
  const [replyTextBox, setReplyTextBox] = useState(false);
  const [replyDone, setReplyDone] = useState(false);
  const [edit , setEdit] = useState(false)

  function replyClick() {
    setReplyButton(false);
    setReplyTextBox(true)
  }

  function replyDoneClick() {
    setReplyDone(true);
    setReplyButton(false)
    setReplyTextBox(false)
    setEdit(true)
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <CourseCommentStudent />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mr: { xl: '9vmin', lg: '11vmin', md: '12vmin', sm: '10vmin', xs: '4vmin' },
            display: replybutton ? 'visible' : 'none',
          }}
        >
          <Button type="submit" variant="contained" className="course-add-comment-button" onClick={replyClick}>
            پاسخ
          </Button>
        </Grid>
        <Grid item xs={12} mt={3} sx={{ display: replyTextBox ? 'visible' : 'none' }}>
          <CourseAddComment onClick={replyDoneClick} />
        </Grid>
        <Grid item xs={12} sx={{ display: replyDone ? 'visible' : 'none' }}>
          <CourseCommentTeacher />
        </Grid>
        <Grid
          dir="ltr"
          item
          xs={12}
          sx={{
            ml: { xl: '9vmin', lg: '11vmin', md: '12vmin', sm: '10vmin', xs: '4vmin' },
            display: edit ? 'visible' : 'none',
          }}
        >
          <Button type="submit" variant="contained" className="course-edit-comment-button" onClick={replyClick}>
            ویرایش
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseComment;
