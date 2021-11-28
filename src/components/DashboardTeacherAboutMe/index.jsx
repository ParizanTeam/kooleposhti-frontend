import React, { useState, useEffect, useRef } from 'react';
import SignupIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { Button, Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import FormData from 'form-data';
import { Formik } from 'formik';
import ReactLoading from 'react-loading';
import axios from '../../utils/axiosConfig';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML , convertToRaw  } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import './style.scss';

function DashboardTeacherAboutMe(props) {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [teacher_data, setteacherData] = useState({});
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  let init_content = ""
  const [editorState, setEditorState] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(`<p>درباره من ...</p>`)
    )));
  const token = 'JWT ' + localStorage.getItem('access_token');

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/accounts/profile/update-profile/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response.data.data.bio);
          /* setEditorContent(response.data.data.bio); */
          setEditorState(EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(response.data.data.bio)
              )
              ));
          console.log("content:",editorContent)
        })
        .catch(err => {});
    }
    fetchData();
  }, []);

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    placeholder: 'درباره من ...',
    minHeight: 500,
    editorCssClass: 'about-me',
    statusbar: false,
  };

  const onContentStateChange = editorcontent => {
    setEditorContent(editorcontent);
  };

  const onEditorStateChange = editorstate => {
    setEditorState(editorstate);
  };



  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Helmet>
          <title>پروفایل</title>
        </Helmet>
        <ToastContainer />

        <Container maxWidth="lg" component="main" sx={{ margin: 'auto auto 30px auto' }}>
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'iranyekan',
            }}
          >
            <Typography
              component="h2"
              variant="Button"
              sx={{ color: 'rgba(10, 67, 94, 0.942)', fontSize: { sm: '3vmin', xs: '4vmin' } }}
            >
              درباره من
            </Typography>

            <ToastContainer rtl={true} />

            <Formik
              enableReinitialize={true}
              initialValues={{}}
              onSubmit={async values => {
                try {
                  setLoading(true);
                  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                  const body = { bio: draftToHtml(convertToRaw(editorState.getCurrentContent())) };
                  axios
                    .put(`${baseUrl}/accounts/profile/update-profile/`, JSON.stringify(body), {
                      headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                      },
                    })
                    .then(response => {
                      console.log('response ', response);
                      toast.success('با موفقیت به‌روز شد', {
                        position: 'bottom-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                      });
                      setLoading(false);
                    })
                    .catch(err => {
                      setLoading(false);
                      console.log('error', err.response.data.message);
                      toast.error('شرمنده یه بار دیگه امتحان کن', {
                        position: 'bottom-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                      });
                    });
                } catch (error) {
                  console.log('error');
                }
              }}
              validateOnChange={validateAfterSubmit}
              validate={values => {
                let error = {};

                return error;
              }}
            >
              {({ handleSubmit, handleChange, setFieldValue, values, errors, handleBlur }) => (
                <Box
                  component="form"
                  id="profile-form"
                  noValidate
                  sx={{ mt: 4 }}
                  onSubmit={e => {
                    e.preventDefault();
                    setValidateAfterSubmit(true);
                    handleSubmit();
                  }}
                >
                  <ToastContainer rtl={true} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className="wrapper">
                        <Editor
                          defaultEditorState={editorState}
                          editorState={editorState}
                          editorContent={editorContent}
                          wrapperClassName="editor-wrapper"
                          editorClassName="editor-main"
                          onContentStateChange={onContentStateChange}
                          onEditorStateChange={onEditorStateChange}
                          toolbar={{
                            inline:{inDropdown: true},
                            list:{inDropdown: true},
                            textAlign:{inDropdown: true},
                            link:{inDropdown: true},
                            history:{inDropdown: true},
                            
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, backgroundColor: 'rgba(10, 67, 94, 0.942) !important' }}
                      typeof="submit"
                    >
                      {!loading && <span>تایید</span>}
                      {loading && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
                    </Button>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherAboutMe;
