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
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (props.teacherComment != null) {
      setReplyButton(false);
      setReplyDone(true);
      setEdit(true);
    }
  }, []);

  function replyClick() {
    setReplyButton(false);
    setReplyTextBox(true);
    setEdit(false);
  }

  function editClick() {
    setEditMode(true);
    setReplyButton(false);
    setReplyTextBox(true);
    setEdit(false);
  }

  function replyDoneClick() {
    setReplyDone(true);
    setReplyButton(false);
    setReplyTextBox(false);
    setEdit(true);
    setEditMode(false);
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <CourseCommentStudent info={props.studentComment} />
        </Grid>
        {replybutton && (
          <Grid
            item
            xs={12}
            sx={{
              mr: { xl: '10vmin', lg: '11vmin', md: '12vmin', sm: '10vmin', xs: '0vmin' },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              className="course-add-comment-button"
              onClick={replyClick}
              sx={{ display: props.role === 'teacher' ? 'visible' : 'none' }}
            >
              پاسخ
            </Button>
          </Grid>
        )}
        {replyTextBox && (
          <Grid item xs={12} mt={3}>
            {(props.role === 'student' || editMode === true || replyTextBox === true) && (
              <CourseAddComment
                course_id={props.studentComment.course_id}
                comment_id={props.studentComment.id}
                reply={true}
                refresh={props.refresh}
                edit_mode={editMode}
                reply_id={props.teacherComment ? props.teacherComment.id : null}
                onReplyDone={replyDoneClick}
                comment={props.teacherComment? props.teacherComment.text : null}
              />
            )}
          </Grid>
        )}
        {replyDone && (
          <Grid item xs={12}>
            <CourseCommentTeacher info={props.teacherComment} />
          </Grid>
        )}
        {edit && (
          <Grid
            dir="ltr"
            item
            xs={12}
            sx={{
              ml: { xl: '10vmin', lg: '11vmin', md: '12vmin', sm: '10vmin', xs: '1vmin' },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              className="course-edit-comment-button"
              onClick={editClick}
              sx={{ display: props.role === 'teacher' ? 'visible' : 'none' }}
            >
              ویرایش
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default CourseComment;
