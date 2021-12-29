import ComeBack from '../../assets/images/StudentProfile/ComeBack.png';

import React, { useState, useEffect, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { FormDialog } from './FormDialog';
import ColorModal from './ColorModal';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cacheRtl = createCache({
  key: 'muirtl',

  stylisPlugins: [rtlPlugin],

  prepend: true,
});
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

function StudentAboutMe(props) {
  const themeProps = useSelector(state => state.theme);
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`<p>درباره من ...</p>`)))
  );

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/accounts/profile/update-profile/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          EditorState.createWithContent(
            customContentStateConverter(ContentState.createFromBlockArray(convertFromHTML(response.data.data.bio)))
          );
        })
        .catch(err => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

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
              sx={{ color: `${themeProps.primaryColor}`, fontSize: { sm: '3vmin', xs: '4vmin' } }}
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
                  const body = { bio: draftToHtml(convertToRaw(editorState.getCurrentContent())) };

                  axios
                    .put(`${baseUrl}/accounts/profile/update-profile/`, JSON.stringify(body))
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
                  setLoading(false);
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
                      <div
                        className="wrapper"
                        style={{
                          boxShadow: `rgba(0, 0, 0, 0.60) 0px 2px 8px !important`,
                          border: `3px solid ${themeProps.primaryColor}`,
                        }}
                      >
                        <Editor
                          defaultEditorState={editorState}
                          editorState={editorState}
                          editorContent={editorContent}
                          wrapperClassName="editor-wrapper"
                          editorClassName="editor-main myColo"
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

function SProfile(props) {
  const themeProps = useSelector(state => state.theme);

  function replaceUndefinied(item) {
    var str = JSON.stringify(item, function (key, value) {
      return value === null ? '' : value;
    });
    return JSON.parse(str);
  }
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [binaryFile, setBinaryFile] = useState(null);
  const [changeImage, setChangeImage] = useState(false);

  const userData = replaceUndefinied(useSelector(state => state.auth));
  const dispatch = useDispatch();
  console.log(userData);

  const [file, setFile] = useState(profile_1);
  console.log(file);

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setChangeImage(true);

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
            <Avatar  src={userData.image ? userData.image.image : file} alt="profile" sx={{ mt: 1, width: '18vmin', height: '18vmin', borderRadius: '50%' }} />

            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: themeProps.primaryColor, color: 'white', width: '120px', mt: 2 }}
            >
              <p style={{ fontSize: '0.8rem' }}>انتخاب عکس</p>
              <input type="file" hidden onChange={handleChange} accept=".jpg,.jpeg,.png" />
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
                  const formdata = new FormData();
                  let body = { ...values };
                  let imag_uploaded = true;
                  formdata.append('image', binaryFile);
                  if (changeImage) {
                    const res = await axios
                      .post(`${baseUrl}/images/`, formdata, {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                      .then(res => {
                        console.log('res', res);
                        console.log('res image', res.data.image);
                        body = { ...values, image_url: res.data.image };
                      })
                      .catch(err => {
                        console.log('error', err);
                        imag_uploaded = false;
                      });
                  }

                  console.log("body",body);
                  if(values.password === undefined){
                    body = {...body, password:""};
                    if(values.phone_no === ""){
                      body = {...body , phone_no:null};
                    }
                  }
                  console.log("body",body);
                  axios
                    .put(`${baseUrl}/accounts/students/me/`, JSON.stringify(body), {
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
                        InputLabelProps={{ shrink: !!values.first_name }}
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
                        InputLabelProps={{ shrink: !!values.last_name }}
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
                        InputLabelProps={{ shrink: !!values.username }}
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
                        InputLabelProps={{ shrink: !!values.email }}
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
                        InputLabelProps={{ shrink: !!values.password }}
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
                        InputLabelProps={{ shrink: !!values.phone_no }}
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
  const themeProps = useSelector(state => state.theme);

  return (
    <div>
      <Navbar color={themeProps.primaryColor} />
      <div className="mainPro">
        <div>
          <WelcomeBox />
        </div>
        <div
          className="marginBox"
          style={{
            backgroundColor: themeProps.secondaryColor,
            boxShadow: `${themeProps.primaryColor} 0px 2px 10px`,
            color: themeProps.primaryColor,
          }}
        >
          <span>
            <SProfile />
          </span>
          <span>
            <StudentAboutMe />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

const WelcomeBox = ({ firstname = 'دوست', lastname = 'عزیز' }) => {
  const themeProps = useSelector(state => state.theme);

  return (
    <div className="welcomebox">
      <div
        className="welcomebox__display-name"
        style={{
          backgroundColor: themeProps.primaryColor,
          color: themeProps.secondaryColor,
          boxShadow: `${themeProps.primaryColor} 0px 2px 10px`,
        }}
      >
        <br />
        <img src={profile_1} alt="UserProfile" />
        <span className="welcomebox__display-name__content">
          {firstname} {lastname}
        </span>
        <br />
      </div>

      <div
        className="welcomebox__Hello"
        style={{
          backgroundColor: themeProps.secondaryColor,
          color: themeProps.primaryColor,
          boxShadow: `${themeProps.primaryColor} 0px 2px 10px`,
        }}
      >
        <br />
        <span>سلام </span>
        <span> {firstname} </span>
        <span>عزیز</span>
        <p>به کوله پشتی خوش اومدی</p>
        <br />
        <img src={themeProps.welcomeImage} alt="HelloDrearUser" />
      </div>
      <div className="welcomebox__color-modal">
        <ColorModal />
      </div>
    </div>
  );
};
