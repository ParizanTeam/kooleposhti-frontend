import React, { useState, useEffect } from 'react';
import CourseCommentStudent from '../CourseCommentStudent';
import CourseCommentTeacher from '../CourseCommentTeacher';
import CourseAddComment from '../CourseAddComment';
import { Grid, Button } from '@mui/material';
import './style.scss';

function CourseComment(props) {
  const [replybutton, setReplyButton] = useState(true);
  const [replyTextBox, setReplyTextBox] = useState(false);
  const [replyDone, setReplyDone] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(async () => {
    async function init() {
      if (props.teacherComment != null) {
        setReplyButton(false);
        setReplyDone(true);
        setEdit(true);
      }
    }

    const res = await init();
  }, []);

  function replyClick() {
    setReplyButton(false);
    setReplyTextBox(true);
    setEdit(false);
  }

  function replyDoneClick() {
    setReplyDone(true);
    setReplyButton(false);
    setReplyTextBox(false);
    setEdit(true);
  }

  console.log(props.studentComment);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <CourseCommentStudent comment={props.studentComment} />
        </Grid>
        {replybutton && (
          <Grid
            item
            xs={12}
            sx={{
              mr: { xl: '9vmin', lg: '11vmin', md: '12vmin', sm: '10vmin', xs: '4vmin' },
            }}
          >
            <Button type="submit" variant="contained" className="course-add-comment-button" onClick={replyClick}>
              پاسخ
            </Button>
          </Grid>
        )}
        {replyTextBox && (
          <Grid item xs={12} mt={3}>
            <CourseAddComment onClick={replyDoneClick} />
          </Grid>
        )}
        {replyDone && (
          <Grid item xs={12}>
            <CourseCommentTeacher comment={props.teacherComment} />
          </Grid>
        )}
        {edit && (
          <Grid
            dir="ltr"
            item
            xs={12}
            sx={{
              ml: { xl: '9vmin', lg: '11vmin', md: '12vmin', sm: '10vmin', xs: '4vmin' },
            }}
          >
            <Button type="submit" variant="contained" className="course-edit-comment-button" onClick={replyClick}>
              ویرایش
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default CourseComment;
