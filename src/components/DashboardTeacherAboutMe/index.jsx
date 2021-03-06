import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Box, Typography, Container } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import ReactLoading from 'react-loading';
import axios from '../../utils/axiosConfig';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import './style.scss';

const customContentStateConverter = contentState => {
  // changes block type of images to 'atomic'
  const newBlockMap = contentState.getBlockMap().map(block => {
    const entityKey = block.getEntityAt(0);
    if (entityKey !== null) {
      const entityBlock = contentState.getEntity(entityKey);
      const entityType = entityBlock.getType();
      switch (entityType) {
        case 'IMAGE': {
          const newBlock = block.merge({
            type: 'atomic',
            text: 'img',
          });
          return newBlock;
        }
        default:
          return block;
      }
    }
    return block;
  });
  const newContentState = contentState.set('blockMap', newBlockMap);
  return newContentState;
};

function DashboardTeacherAboutMe(props) {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`<p>درباره من ...</p>`)))
  );
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

          setEditorState(
            EditorState.createWithContent(
              customContentStateConverter(ContentState.createFromBlockArray(convertFromHTML(response.data.data.bio)))
            )
          );
          console.log('content:', editorContent);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });


  const onContentStateChange = editorcontent => {
    setEditorContent(editorcontent);
  };

  const onEditorStateChange = editorstate => {
    setEditorState(editorstate);
  };

  return (
    <CacheProvider value={cacheRtl}>
      {loading && (
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <ReactLoading type="spinningBubbles" color="rgb(42, 105, 129)" height={100} width={100} />
          </Grid>
        </Grid>
      )}
      {!loading && (
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
                    setLoadingButton(true);
                    const body = { bio: draftToHtml(convertToRaw(editorState.getCurrentContent())) };
                    axios
                      .put(`${baseUrl}/accounts/profile/update-profile/`, JSON.stringify(body), {
                        headers: {
                          Authorization: token,
                          'Content-Type': 'application/json',
                        },
                      })
                      .then(() => {
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
                        setLoadingButton(false);
                      })
                      .catch(err => {
                        setLoadingButton(false);
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
                    setLoadingButton(false);
                  }
                }}
                validateOnChange={validateAfterSubmit}
                validate={values => {
                  let error = {};

                  return error;
                }}
              >
                {({ handleSubmit, handleChange, setFieldValue, handleBlur }) => (
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
                              inline: { inDropdown: true },
                              list: { inDropdown: true },
                              textAlign: { inDropdown: true },
                              link: { inDropdown: true },
                              history: { inDropdown: true },
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
                        {!loadingButton && <span>تایید</span>}
                        {loadingButton && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
                      </Button>
                    </Grid>
                  </Box>
                )}
              </Formik>
            </Box>
          </Container>
        </div>
      )}
    </CacheProvider>
  );
}

export default DashboardTeacherAboutMe;
