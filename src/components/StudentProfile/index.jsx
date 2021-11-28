import Pro from './Pro';
import ProBar from './Pro/ProBar';
import ComeBack from '../../assets/images/StudentProfile/ComeBack.png';

import React, { useState, useEffect,useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import FormData from 'form-data';
import { Formik } from 'formik';
import profile_1 from '../../assets/images/StudentProfile/UsreIcon.png';
import './style.scss';
import axios from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { login } from '../../store/actions';
import Navbar from '../Navbar';
import { themeProps } from './constant';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import {FormDialog} from './FormDialog';
import ColorModal from './ColorModal';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML , convertToRaw  } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


function StudentAboutMe(props) {
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
                          editorClassName="editor-main myColo"
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
                      sx={{ mt: 3, backgroundColor: `${themeProps.primaryColor} !important`}}
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

function SProfile(props) {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [binaryFile, setBinaryFile] = useState(null);
  const userData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(userData);

  const [file, setFile] = useState(profile_1);
  console.log(file);

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));

    let picture = e.target.files[0];
    console.log('picture', picture);
    setBinaryFile(picture);
  };
  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Helmet>
          <title>پروفایل</title>
        </Helmet>
        <ToastContainer />

        <Container maxWidth="xl" component="main" sx={{ margin: 'auto 12vmin 30px auto' }}>
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
              sx={{ color: themeProps.primaryColor, fontSize: { sm: '3vmin', xs: '4vmin' } }}
            >
              ویرایش حساب کاربری
            </Typography>
            <Avatar src={file} alt="profile" sx={{ mt: 1, width: 'auto', height: '18vmin', borderRadius: '50%' }} />

            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: themeProps.primaryColor, color: 'white', width: '120px', mt: 2 }}
            >
              <p style={{ fontSize: '0.8rem' }}>انتخاب عکس</p>
              <input type="file" hidden onChange={handleChange} />
            </Button>

            <ToastContainer rtl={true} />

            <Formik
              enableReinitialize={true}
              initialValues={{
                username: userData.username,
                email: userData.email,
                password: userData.password,
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone_no: userData.phone_no,
              }}
              onSubmit={async values => {
                try {
                  setLoading(true);

                  console.log('pass: ', document.getElementById('password').value);
                  console.log('binary file', binaryFile);

                  const formdata = new FormData();

                  const data = { ...values, 'image.image': binaryFile };
                  formdata.append('username', values.username);
                  formdata.append('email', values.email);
                  formdata.append('first_name', values.first_name);
                  formdata.append('last_name', values.last_name);
                  formdata.append('password', values.password);
                  formdata.append('phone_no', values.phone_no);

                  formdata.append('image.image', binaryFile);
                  console.log('form data', formdata);

                  axios
                    .put(`${baseUrl}/accounts/students/me/`, formdata, {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    })
                    .then(response => {
                      console.log(response);
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
                      dispatch(login());
                    })
                    .catch(err => {
                      setLoading(false);
                      console.log('error: ', err.response);
                      toast.error('شرمنده یه بار دیگه امتحان کن !!!', {
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
                  if (error === 'username') {
                    toast.error('این نام کاربری قبلا انتخاب شده', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'dark',
                    });
                  } else if (error === 'email') {
                    toast.error('این ایمیل قبلا در سیستم ثبت شده', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'dark',
                    });
                  } else if (error === 'activate') {
                    toast.error('مشکلی پیش اومده بعدا دوباره امتحان کن', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'dark',
                    });
                  }
                }
              }}
              validateOnChange={validateAfterSubmit}
              validate={values => {
                let error = {};

                if (!values.username) {
                  error.username = ' نام کاربری خودت رو وارد کن';
                } else if (!values.email) {
                  error.email = ' ایمیل خودت رو وارد کن';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  error.email = 'ایمیل نامعتبر';
                }

                return error;
              }}
            >
              {({ handleSubmit, handleChange, setFieldValue, values, errors, handleBlur }) => (
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 3 }}
                  id="profile-form"
                  onSubmit={e => {
                    e.preventDefault();
                    setValidateAfterSubmit(true);
                    handleSubmit();
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        value={values.first_name}
                        InputLabelProps={{ shrink: values.first_name }}
                        autoComplete="given-name"
                        name="first_name"
                        fullWidth
                        id="first_name"
                        label="نام "
                        autoFocus
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.first_name : null}
                        error={Boolean(errors.first_name)}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        autoComplete="given-name"
                        InputLabelProps={{ shrink: values.last_name }}
                        name="last_name"
                        fullWidth
                        id="last_name"
                        label="نام خانوادگی"
                        value={values.last_name}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.last_name : null}
                        error={Boolean(errors.last_name)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={values.username}
                        InputLabelProps={{ shrink: values.username }}
                        autoComplete="given-name"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="نام کاربری"
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.username : null}
                        error={Boolean(errors.username)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        InputLabelProps={{ shrink: values.email }}
                        fullWidth
                        id="email"
                        label="ایمیل"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.email : null}
                        error={Boolean(errors.email)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        InputLabelProps={{ shrink: values.password }}
                        label="رمز عبور جدید"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.password : null}
                        error={Boolean(errors.password)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        InputLabelProps={{ shrink: values.phone_no }}
                        name="phone_no"
                        label="شماره موبایل"
                        type="phone"
                        id="phone_no"
                        value={values.phone_no}
                        onChange={handleChange}
                        helperText={validateAfterSubmit ? errors.phone_no : null}
                        error={Boolean(errors.phone_no)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, backgroundColor: `${themeProps.primaryColor} !important` }}
                      typeof="submit"
                    >
                      {loading ? (
                        <ReactLoading type="bubbles" color="#fff" className="loading-signup" />
                      ) : (
                        <span>تایید</span>
                      )}
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

const StudentProfile = () => {
  return (
    <div>
      <FormDialog />
      <Navbar color={themeProps.primaryColor} />
      <div className="mainPro">
        <div className="RightBar">
          <ProBar firstname="مریم" lastname="شمس" />
          <Pro firstname="مریم" />
            <div className="PB" style={{ color: themeProps.primaryColor }}>
              <span><ColorModal/></span>
            </div>
        </div>
        <div
          className="Forms"
          style={{ backgroundColor: themeProps.secondaryColor, boxShadow: `${themeProps.primaryColor} 0px 2px 10px` }}
        >
          <SProfile />
        </div>
        <div className="Pro__Hello" style={{backgroundColor: themeProps.secondaryColor, boxShadow: `${themeProps.primaryColor} 0px 2px 10px`, color: themeProps.primaryColor }}>
        <StudentAboutMe/></div>
      </div>
    </div>
  );
};
export default StudentProfile;
