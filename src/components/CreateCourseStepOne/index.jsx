import React, { useState } from 'react';
import {
  Link,
  Grid,
  Box,
  Typography,
  Container,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  useTheme,
  Checkbox,
  ListItemText,
  FormControl,
  FormHelperText,
  Button,
} from '@mui/material';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import persian from 'react-date-object/calendars/persian';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Calendar } from 'react-multi-date-picker';
import InputIcon from 'react-multi-date-picker/components/input_icon';
// import { TimePicker, DateTimePicker, DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateAdapter from '@mui/lab/AdapterDateFns';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import JalaliUtils from '@date-io/jalaali';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, Link as routerLink } from 'react-router-dom';
import * as yup from 'yup';
import rtl from 'jss-rtl';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';
import imageSrc from '../../assets/images/teaching-students-online-internet-learning-computer-programming_335657-3119.jpg';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import { margin, width } from '@mui/system';
import { position } from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const validationSchema = yup.object({
  courseName: yup.string('').required('پر کردن این فیلد الزامی است.'),
  categoryField: yup.string('').required('پر کردن این فیلد الزامی است.'),
  datesAndTimes: yup.string('').required('پر کردن این فیلد الزامی است.'),
});

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const CreateCourseStepOne = ({ formData, setFormData, activeStep, setActiveStep }) => {
  console.log(activeStep);
  const { courseName, category, price, duration, dates, description, courseImage } = formData;
  const [sliderCatergory, setSliderCatergory] = useState('');
  const handleChangeFile = e => {
    setFormData(prev => ({ ...prev, courseImage: URL.createObjectURL(e.target.files[0]) }));
  };

  const handleChange = event => {
    setSliderCatergory(event.target.value);
    console.log(event.target.value);
    setFormData(prev => ({ ...prev, category: event.target.value }));
    // console.log('category is ' + category);
  };

  const handleSelectChange = event => {
    handleChange(event);
  };

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleNext = () => {
    if (courseName != '' && category != '' && dates != '') {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      console.log(dates);
    }
    if (dates == '') {
      toast.error('باید حتما یک تاریخ را انتخاب کنید.');
    }
  };
  const handleLast = () => {
    if (activeStep != 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    } else {
      setActiveStep(0);
    }
  };
  const formik = useFormik({
    initialValues: { formData },
    onSubmit: async values => {
      // try {
      //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //   const isEmail = re.test(String(values.email).toLowerCase());
      //   const body = {
      //     password: values.password,
      //   };
      //   if (isEmail) {
      //     body.email = values.email;
      //   } else {
      //     body.username = values.email;
      //   }
      //   setLoading(true);
      //   const res = await axios.post('https://kooleposhti.herokuapp.com/accounts/jwt/create/', body);
      //   localStorage.setItem('access_token', res.data.access);
      //   localStorage.setItem('refresh_token', res.data.refresh);
      //   dispatch(login());
      //   setLoading(false);
      //   toast.success('با موفقیت وارد شدی.');
      //   setTimeout(() => {
      //     history.push('/');
      //   }, 2000);
      // } catch (error) {
      //   setLoading(false);
      //   toast.error('نام کاربری یا رمز عبورت اشتباهه!', {
      //     position: 'bottom-center',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'dark',
      //     className: 'toast-error',
      //   });
      // }
      setFormData(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div dir="rtl">
        <ToastContainer rtl={true} position="bottom-center" />
        <Typography variant="h5" className="step-one-title" style={{ textAlign: 'center', margin: '2rem' }}>
          مشخصات کلی کلاس
        </Typography>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              dir: 'rtl !important',
              fontFamily: 'iranyekan',
            }}
          >
            <Box
              component="form"
              dir="rtl !important"
              noValidate
              onSubmit={formik.handleSubmit}
              setFieldValue
              sx={{ mt: 1, fontFamily: 'iranyekan' }}
            >
              <TextField
                dir="rtl !important"
                margin="normal"
                required
                fullWidth
                id="class-name"
                label="اسم کلاس"
                name="courseName"
                // errorText={this.state.errorText}
                error={courseName == ''}
                autoFocus
                // className="step-one-input-field"
                value={courseName}
                helperText={courseName == '' ? 'پر کردن این فیلد الزامی است.' : ''}
                // onChange={formik.handleChange}
                onChange={e => {
                  setFormData(prev => ({ ...prev, courseName: e.target.value }));
                }}
                // error={formik.touched.email && Boolean(formik.errors.email)}
                // helperText={formik.touched.email && formik.errors.email}
                // sx={{ mb: 3 }}
              />
              <FormControl className="step-one-select-holder" margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-helper-label">موضوع</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  // value={category}
                  value={category}
                  margin="normal"
                  fullWidth
                  label="موضوع"
                  required
                  error={category == ''}
                  // sx={{ mb: 1 }}
                  name="categoryField"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={1}>مد و لباس</MenuItem>
                  <MenuItem value={2}>زیبایی</MenuItem>
                  <MenuItem value={3}>کتاب</MenuItem>
                  <MenuItem value={4}>ساختن</MenuItem>
                  <MenuItem value={5}>خوشمزه</MenuItem>
                  <MenuItem value={6}>کاردستی</MenuItem>
                  <MenuItem value={7}>بازی</MenuItem>
                  <MenuItem value={8}>نوزاد</MenuItem>
                  <MenuItem value={9}>ورزشی</MenuItem>
                  <MenuItem value={10}>مسافرت</MenuItem>
                  <MenuItem value={11}>حیوانات</MenuItem>
                </Select>
                <FormHelperText style={{ color: '#D32F2F' }}>
                  {category == '' ? 'باید یک گزینه را انتخاب کنید.' : ''}
                </FormHelperText>
              </FormControl>

              {/* <input id="contained-button-file" type="file" />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label> */}

              <label for="calender" className="step-one-calender__label" style={{ display: 'block' }}>
                تاریخ و زمان کلاس ها
              </label>
              <Grid sx={{ width: { md: '65vmin', sm: '65vmin', xs: '92vmin' } }}>
                <DatePicker
                  multiple
                  // render={<InputIcon className="step-one-datePicker" />}
                  value={dates}
                  onChange={dateObject => {
                    console.log(dateObject);
                    setFormData(prev => ({ ...prev, dates: dateObject }));
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  inputClass="step-one-datePicker"
                  // style={{ width: '100%' }}
                  format="HH:mm:ss | YYYY/MM/DD "
                  name="datesAndTimes"
                  minDate={new Date()}
                  // error={dates == ''}
                  // helperText={dates == '' ? 'باید حتما یک روز را انتخاب کنید.' : ''}
                  plugins={[<TimePicker position="bottom" />, <DatePanel position="left" />]}
                  calendarPosition="bottom-right"
                  id="calender"
                />
              </Grid>

              <TextField
                id="outlined-multiline-static"
                label="توضیحات کلاس"
                style={{ display: 'block' }}
                className="step-one-text-area"
                multiline
                rows={7}
                fullWidth
                margin="normal"
                value={description}
                onChange={e => {
                  setFormData(prev => ({ ...prev, description: e.target.value }));
                }}
              />

              <input
                id="contained-button-file"
                type="file"
                style={{ display: 'none', mt: 1, mb: 1 }}
                onChange={handleChangeFile}
              />
              <label htmlFor="contained-button-file">
                <span style={{ display: 'block' }}>
                  <label for="upload-image" className="step-one-calender__label" style={{ display: 'block' }}>
                    عکس کلاس
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ mt: 1, mb: 1 }}
                    id="upload-image"
                    className="step-one-button"
                  >
                    انتخاب فایل
                  </Button>
                </span>
              </label>
              <Grid sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={courseImage}
                  style={{
                    border: courseImage ? '2px solid blue' : '0px',
                    width: courseImage ? '65vmin' : '0px',
                    height: courseImage ? '65vmin' : '0px',
                    display: courseImage ? 'block' : 'none',
                    borderRadius: '5px',
                  }}
                  className="step-one-image"
                />
              </Grid>

              <div className="steeper-button__holder">
                <Button
                  variant="contained"
                  color="primary"
                  // component="span"
                  className="steeper-button"
                  onClick={handleLast}
                  disabled={activeStep == 0}
                >
                  صفحه‌ی قبل
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  // component="span"
                  className="steeper-button"
                  onClick={handleNext}
                >
                  {activeStep == 2 ? 'پایان' : 'صفحه‌ی بعد'}
                </Button>
              </div>
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
};

export default CreateCourseStepOne;

// {
//   /* <div className="step-one-main-container">
//         <Typography variant="h5" className="step-one-title" style={{ textAlign: 'center', margin: '2rem' }}>
//           مشخصات اصلی
//         </Typography>

//         <div className="step-one-form-container">
//           <form>
//             <TextField style={{ width: '100%', margin: '1rem 0' }} variant="outlined" label="اسم کلاس"></TextField>

//             <FormControl className="step-one-dropdown-holder">
//               <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
//               <Select
//                 labelId="demo-multiple-checkbox-label"
//                 id="demo-multiple-checkbox"
//                 multiple
//                 value={personName}
//                 onChange={handleChange}
//                 input={<OutlinedInput label="Tag" />}
//                 renderValue={selected => selected.join(', ')}
//                 MenuProps={MenuProps}
//               >
//                 {names.map(name => (
//                   <MenuItem key={name} value={name}>
//                     <Checkbox checked={personName.indexOf(name) > -1} />
//                     <ListItemText primary={name} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </form>
//         </div>
//       </div> */
// }
