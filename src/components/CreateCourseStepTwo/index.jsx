import { React, useState } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  useTheme,
  FormHelperText,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import * as yup from 'yup';
import rtl from 'jss-rtl';
import axios from 'axios';
import { login } from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
// import { Link } from 'react-router-dom';
import './style.scss';
import { margin } from '@mui/system';
import { baseUrl } from '../../utils/constants';
import { convertNumberToPersian, isPersianNumber } from '../../utils/helpers';

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
  email: yup.string('').required('باید حتما ایمیل یا نام کاربریت رو بنویسی تا بتونی وارد بشی.'),
  password: yup.string('').required('باید حتما رمز عبورت رو بنویسی تا بتونی وارد بشی.'),
});

function CreateCourseStepTwo(props) {
  const { formData, setFormData, activeStep, setActiveStep } = props;
  const [capacityBlured, setCapacityBlured] = useState(false);
  const [ageRangeBlured, setAgeRangeBlured] = useState(false);
  console.log(activeStep);
  const { objectives, capacity, age, startAge, endAge } = formData;
  const [ageSlider, setAgeSlider] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const text = '';
  console.log(props);
  //   const [personName, setPersonName] = useState([]);
  const [learnings, setLearnings] = useState([{ learningItem: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ prerequisity: '' }]);

  const handleChange = event => {
    setAgeSlider(event.target.value);
    console.log(event.target.value);
    // setFormData(prev => ({ ...prev, age: event.target.value }));
    if (event.target.value === 1) {
      console.log('hello');
      setFormData(prev => ({ ...prev, age: event.target.value, startAge: '4', endAge: '7' }));
    } else if (event.target.value === 2) {
      console.log('hello');
      setFormData(prev => ({ ...prev, age: event.target.value, startAge: '7', endAge: '10' }));
    } else if (event.target.value === 3) {
      console.log('hello');
      setFormData(prev => ({ ...prev, age: event.target.value, startAge: '10', endAge: '13' }));
    } else if (event.target.value === 4) {
      console.log('hello');
      setFormData(prev => ({ ...prev, age: event.target.value, startAge: '13', endAge: '18' }));
    } else if (event.target.value === 5) {
      console.log('hello');
      setFormData(prev => ({ ...prev, age: event.target.value, startAge: '4', endAge: '10' }));
    } else if (event.target.value === 6) {
      console.log('hello');
      setFormData(prev => ({ ...prev, age: event.target.value, startAge: '10', endAge: '18' }));
    } else if (event.target.value === 7) {
      console.log('hello');
      setFormData(prev => ({ ...prev, age: event.target.value, startAge: '4', endAge: '18' }));
    }
    // console.log('start is ' + startAge);
    // console.log('end is ' + endAge);
  };

  const handleSelectChange = event => {
    handleChange(event);
  };

  const handleNext = () => {
    setCapacityBlured(true);
    setAgeRangeBlured(true);
    if (capacity != '' && age != '' && isPersianNumber(capacity)) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
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
        const res = await axios.post(`${baseUrl}/accounts/jwt/create/`, body);
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

  const handleLearningChange = (index, event) => {
    const values = [...learnings];
    values[index][event.target.name] = event.target.value;
    setLearnings(values);
  };

  console.log('capacity is :' + capacity);
  const handleAddLearnings = () => {
    setLearnings([...learnings, { learningItem: '' }]);
  };

  const handleRemoveLearnings = index => {
    const values = [...learnings];
    values.splice(index, 1);
    setLearnings(values);
  };

  const handlePrerequistiesChange = (index, event) => {
    const values = [...prerequisites];
    values[index][event.target.name] = event.target.value;
    setPrerequisites(values);
  };

  const handleAddPrerequisties = () => {
    setPrerequisites([...prerequisites, { prerequisty: '' }]);
  };

  const handleRemovePrerequisties = index => {
    const values = [...prerequisites];
    values.splice(index, 1);
    setPrerequisites(values);
  };

  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div dir="rtl">
        <ToastContainer rtl={true} position="bottom-center" />
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
            <Typography component="h1" variant="h5" sx={{ fontFamily: 'iranyekan' }}></Typography>
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
                id="email"
                label="ظرفیت کلاس"
                name="capacity"
                autoFocus
                value={convertNumberToPersian(capacity)}
                onBlur={() => setCapacityBlured(true)}
                error={(capacity === '' || !isPersianNumber(capacity)) && capacityBlured}
                helperText={
                  capacity === '' && capacityBlured
                    ? 'پر کردن این فیلد الزامی است '
                    : capacityBlured && !isPersianNumber(capacity)
                    ? 'باید مقدار عددی وارد کنید.'
                    : ''
                }
                onChange={e => {
                  setFormData(prev => ({ ...prev, capacity: convertNumberToPersian(e.target.value) }));
                }}
              />
              <FormControl
                sx={{ minWidth: 120, width: { md: '67vmin', sm: '65vmin', xs: '92vmin' } }}
                className="step-two-select-container"
              >
                <InputLabel id="demo-simple-select-helper-label" margin="normal">
                  رده سنی*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  label="رده سنی*"
                  name="ageRange"
                  error={age === '' && ageRangeBlured}
                  onChange={handleSelectChange}
                  // style={{ margin: '50px' }}
                >
                  <MenuItem value={1}>بین ۴ تا ۷</MenuItem>
                  <MenuItem value={2}>بین ۷ تا ۱۰</MenuItem>
                  <MenuItem value={3}>بین ۱۰ تا ۱۳</MenuItem>
                  <MenuItem value={4}>بین ۱۳ تا ۱۸</MenuItem>
                  <MenuItem value={5}>بین ۴ تا ۱۰</MenuItem>
                  <MenuItem value={6}>بین ۱۰ تا ۱۸</MenuItem>
                  <MenuItem value={7}>بین ۴ تا ۱۸</MenuItem>
                </Select>
                <FormHelperText style={{ color: '#D32F2F' }}>
                  {age === '' && ageRangeBlured ? 'باید یک گزینه را انتخاب کنید.' : ''}
                </FormHelperText>
              </FormControl>

              <h3 className="step-two-dynamic-input-title">با شرکت در کلاس شما، چه چیزی یاد می‌گیریم؟</h3>

              {objectives.map((objective, index) => (
                <div key={index} className="step-two-dynamic-input-fields">
                  <TextField
                    name="learningItem"
                    label={`هدف ${
                      index === 0 ? 'اول' : index === 1 ? 'دوم' : index === 2 ? 'سوم' : index === 3 ? 'چهارم' : ''
                    }`}
                    variant="outlined"
                    value={objective}
                    sx={{ width: { md: '67vmin  ', sm: '67vmin', xs: '91vmin' } }}
                    onChange={e =>
                      setFormData(prev => {
                        const newObjectives = prev.objectives;
                        newObjectives[index] = e.target.value;
                        return { ...prev, objectives: newObjectives };
                      })
                    }
                  ></TextField>
                </div>
              ))}

              {/* <h3 className="step-two-dynamic-input-title">پیش نیازهای شرکت در کلاس</h3>

              {prerequisites.map((prerequisitiesItem, index) => (
                <div key={index} className="step-two-dynamic-input-fields">
                  <IconButton>
                    <AddIcon
                      style={{ color: 'green' }}
                      onClick={() => handleAddPrerequisties()}
                      className="step-two-dynamic-input-buttons"
                    ></AddIcon>
                  </IconButton>
                  <IconButton>
                    <RemoveIcon
                      style={{ color: 'red' }}
                      onClick={index => handleRemovePrerequisties(index)}
                      className="step-two-dynamic-input-buttons"
                    ></RemoveIcon>
                  </IconButton>
                  <TextField
                    name="learningItem"
                    label={text}
                    variant="outlined"
                    value={prerequisitiesItem.prerequisity}
                    sx={{ width: { md: '40vmin  ', sm: '40vmin', xs: '70vmin' } }}
                    onChange={event => handlePrerequistiesChange(index, event)}
                  ></TextField>
                </div>
              ))} */}
              <div className="steeper-button__holder">
                <Button
                  variant="contained"
                  color="primary"
                  // component="span"
                  className="steeper-button"
                  onClick={handleLast}
                  disabled={activeStep === 0}
                >
                  صفحه‌ی قبل
                </Button>

                <Link to="/dashboard/teacher/">
                  <Button variant="contained" color="error" className="steeper-button">
                    بازگشت به داشبورد
                  </Button>
                </Link>

                <Button
                  variant="contained"
                  color="primary"
                  // component="span"
                  className="steeper-button"
                  onClick={handleNext}
                >
                  {activeStep === 2 ? 'پایان' : 'صفحه‌ی بعد'}
                </Button>
              </div>
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
}

export default CreateCourseStepTwo;
