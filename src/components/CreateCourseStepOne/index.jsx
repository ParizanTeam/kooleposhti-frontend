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
import { margin } from '@mui/system';
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

const names = [
  'مد و لباس',
  'زیبایی',
  'کتاب',
  'ساختن',
  'خوشمزه',
  'کاردستی',
  'بازی',
  'نوزاد',
  'ورزشی',
  'مسافرت',
  'حیوانات',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const validationSchema = yup.object({
  email: yup.string('').required('باید حتما ایمیل یا نام کاربریت رو بنویسی تا بتونی وارد بشی.'),
  password: yup.string('').required('باید حتما رمز عبورت رو بنویسی تا بتونی وارد بشی.'),
});

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function CreateCourseStepOne() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [selectedDate, handleDateChange] = useState(moment());
  const [file, setFile] = useState('');
  const [value, onChange] = useState('10:00');
  const handleChangeFile = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [values, setValues] = useState([
    new DateObject({ calendar: persian, locale: persian_fa }), //امروز,
    new DateObject({ calendar: persian, locale: persian_fa }).add(1, 'day'), //فردا
  ]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async values => {
      try {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = re.test(String(values.email).toLowerCase());
        const body = {
          password: values.password,
        };
        if (isEmail) {
          body.email = values.email;
        } else {
          body.username = values.email;
        }
        setLoading(true);
        const res = await axios.post('https://kooleposhti.herokuapp.com/accounts/jwt/create/', body);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        dispatch(login());
        setLoading(false);
        toast.success('با موفقیت وارد شدی.');
        setTimeout(() => {
          history.push('/');
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error('نام کاربری یا رمز عبورت اشتباهه!', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'toast-error',
        });
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div dir="rtl">
        <ToastContainer rtl={true} position="bottom-center" />
        <Typography variant="h5" className="step-one-title" style={{ textAlign: 'center', margin: '2rem' }}>
          مشخصات اصلی
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
                name="class-name"
                autoFocus
                className="step-one-input-field"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 3 }}
              />
              <FormControl className="step-one-dropdown-holder" sx={{ mb: 1 }}>
                <InputLabel id="demo-multiple-chip-label">موضوع درس</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="موضوع درس" />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                style={{ width: '95%', margin: '1rem 0 0.5rem 0' }}
                variant="outlined"
                label="هزینه ثبت نام در کلاس(تومان)"
              ></TextField>

              <TextField
                style={{ width: '95%', margin: '1rem 0 0 0' }}
                variant="outlined"
                label="مدت زمان هر جلسه(دقیقه)"
              ></TextField>

              {/* <input id="contained-button-file" type="file" />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label> */}

              <label for="calender" className="step-one-calender__label" style={{ display: 'block' }}>
                تاریخ و زمان کلاس ها
              </label>
              <DatePicker
                multiple
                // render={<InputIcon className="step-one-datePicker" />}
                value={values}
                onChange={setValues}
                calendar={persian}
                locale={persian_fa}
                inputClass="step-one-datePicker"
                format="HH:mm:ss | YYYY/MM/DD "
                plugins={[<TimePicker position="bottom" />, <DatePanel position="left" />]}
                calendarPosition="bottom-right"
                id="calender"
              />

              <TextField
                id="outlined-multiline-static"
                label="توضیحات کلاس"
                style={{ display: 'block' }}
                className="step-one-text-area"
                multiline
                rows={4}
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
              <img src={file} />
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
}

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