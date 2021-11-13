import Pro from './Pro';
import ProBar from './Pro/ProBar';
import ComeBack from '../../assets/images/StudentProfile/ComeBack.png';

import React, { useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
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
import axios from 'axios';

import Navbar from '../Navbar';

import FormDialog from '../InfoDialog';

function SProfile(props) {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [binaryFile, setBinaryFile] = useState(null);
  const [student_data, setteacherData] = useState({});



  const token = 'JWT ' + localStorage.getItem('access_token');
  console.log(token);

  useEffect(() => {
    async function fetchData(){
      const res = await axios
      .get(
        'https://kooleposhti.herokuapp.com/accounts/instructors/me/',
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(response => {
        console.log("get response: ",response);
        setteacherData(response.data);
        setFile(response.data.image.image);
        
      })
      .catch(err => {
        console.log('error: ', err);
      });
    }
    fetchData();
  }, []);

  const [file, setFile] = useState(profile_1);
  console.log(file);

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    /*console.log('picture', picture);*/
    /*setBinaryFile(picture);*/
  };

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  console.log(student_data.username);
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
            <Typography component="h2" variant="Button" sx={{ color: 'rgb(122, 0, 71);' ,fontSize:{sm:"3vmin" , xs:"4vmin"}}}>
              ویرایش حساب کاربری
            </Typography>
            <Avatar src={file} alt="profile" sx={{mt: 1, width:"auto", height:"18vmin", borderRadius: '50%' }} />

            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: 'rgb(122, 0, 71);', color: 'white', width: '120px', mt: 2 }}
            >
              <p style={{ fontSize: '0.8rem' }}>انتخاب عکس</p>
              <input type="file" hidden onChange={handleChange} />
            </Button>

            <ToastContainer rtl={true} />

            <Formik
              enableReinitialize={true}
              initialValues={{
                username: student_data.username ,
                email: student_data.email,
                password: student_data.password,
                first_name: student_data.first_name ,
                last_name: student_data.last_name ,
                phone_no: student_data.phone_no  ,
              }}
              onSubmit={async values => {
                try {
                  setLoading(true);

                  console.log(token);
                  console.log('pass: ', document.getElementById('password').value);
                  console.log('binary file', binaryFile);

                  const formdata = new FormData();
                  
                  const data = {... values , "image.image":binaryFile};
                  formdata.append('username',values.username);
                  formdata.append('email',values.email);
                  formdata.append('first_name',values.first_name);
                  formdata.append('last_name',values.last_name);
                  formdata.append('password',values.password);
                  formdata.append('phone_no', values.phone_no);

                  formdata.append('image.image', binaryFile);
                  console.log('form data', formdata);
                  

                  axios
                    .put('https://kooleposhti.herokuapp.com/accounts/instructors/me/', formdata, {
                      headers: {
                        Authorization: token,
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
                    })
                    .catch(err => {
                      setLoading(false);
                      console.log('error');
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
            <Box component="form" noValidate sx={{ mt: 3 }}
            id="profile-form"
            onSubmit={e => {
              e.preventDefault();
              setValidateAfterSubmit(true);
              handleSubmit();
            }}>
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
                  sx={{ mt: 3, backgroundColor: 'rgb(122, 0, 71); !important' }}
                >
                  تایید
                </Button>
              </Grid>
            </Box>)}
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
      <FormDialog/>
    <Navbar color="#7a0047"/>
    <div className='mainPro'>
        <div className='RightBar'>
          <ProBar />
          <Pro />
          <Link to="/">
          <div className='PB'>
          <img src={ComeBack} alt="PB" className='PB__media'/>
          <span className='PB__content'>برگردیم خونه؟</span>
        </div></Link>
        </div>
        <div className='Forms'>
            <SProfile/>
        </div>
      
    </div>
    </div>
  );
};
export default StudentProfile;
