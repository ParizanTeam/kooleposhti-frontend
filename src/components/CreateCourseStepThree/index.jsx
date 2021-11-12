import { React, useState } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
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
import { useHistory, Link as routerLink } from 'react-router-dom';
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
import { Helmet } from 'react-helmet';
import ReactLoading from 'react-loading';
import './style.scss';
import { margin } from '@mui/system';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

const validationSchema = yup.object({
  email: yup.string('').required('باید حتما ایمیل یا نام کاربریت رو بنویسی تا بتونی وارد بشی.'),
  password: yup.string('').required('باید حتما رمز عبورت رو بنویسی تا بتونی وارد بشی.'),
});

function CreateCourseStepThree(props) {
  const { formData, setFormData, activeStep, setActiveStep } = props;
  console.log(activeStep);
  const { tags, price, duration } = formData;
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const text = '';
  //   const [personName, setPersonName] = useState([]);
  const [learnings, setLearnings] = useState([{ learningItem: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ prerequisity: '' }]);

  const handleNext = () => {
    if (price != '' && duration != '' && !/^[0-9]+$/i.test(price) && !/^[0-9]+$/i.test(duration)) {
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

  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleLearningChange = (index, event) => {
    const values = [...learnings];
    values[index][event.target.name] = event.target.value;
    setLearnings(values);
  };

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
        <Helmet>
          <title>ورود</title>
        </Helmet>
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
                id="class-name"
                label="هزینه شرکت در کلاس(تومان)"
                name="class-price"
                value={price}
                error={price == '' || !/^[0-9]+$/i.test(price)}
                helperText={
                  price == ''
                    ? 'پر کردن این فیلد الزامی است '
                    : '' || !/^[0-9]+$/i.test(price)
                    ? 'باید مقدار عددی وارد کنید.'
                    : ''
                }
                // className="step-one-input-field"
                // value={price}
                onChange={e => {
                  setFormData(prev => ({ ...prev, price: e.target.value }));
                }}

                // sx={{ mb: 1 }}
              />
              <TextField
                dir="rtl !important"
                margin="normal"
                required
                fullWidth
                id="class-name"
                label="مدت زمان هر جلسه(دقیقه)"
                name="class-duration"
                // className="step-one-input-field"
                //value={formik.values.email}
                value={duration}
                onChange={e => {
                  setFormData(prev => ({ ...prev, duration: e.target.value }));
                }}
                error={duration == '' || !/^[0-9]+$/i.test(duration)}
                helperText={
                  duration == ''
                    ? 'پر کردن این فیلد الزامی است '
                    : '' || !/^[0-9]+$/i.test(duration)
                    ? 'باید مقدار عددی وارد کنید.'
                    : ''
                }
                sx={{ mb: 1 }}
              />
              <h3 className="step-two-dynamic-input-title">تگ های درس</h3>
              <p>
                توجه شود که با انتخاب تگ های مناسب، امکان دیده شدن درس شما و نمایش آن در نتابج جست و جو بیشتر می‌شود
              </p>

              {tags.map((tag, index) => (
                <div key={index} className="step-two-dynamic-input-fields">
                  <TextField
                    name="learningItem"
                    label={text}
                    variant="outlined"
                    value={tag}
                    sx={{ width: { md: '65vmin  ', sm: '65vmin', xs: '90vmin' } }}
                    onChange={e =>
                      setFormData(prev => {
                        const newTags = prev.tags;
                        newTags[index] = e.target.value;
                        return { ...prev, tags: newTags };
                      })
                    }
                  ></TextField>
                </div>
              ))}

              {/* <h3 className="step-two-dynamic-input-title">سرفصل‌های درس</h3>
              <p sx={{ marginTop: 2 }}>
                اگر درس شما نظم و برنامه‌ی منظمی داشته باشد، دانش آموزان با آن بهتر ارتباط برقرار می‌کنند و احتمال فروش
                کلاس شما بیشتر خواهد شد.
              </p>

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
                    sx={{ width: { md: '65vmin  ', sm: '65vmin', xs: '90vmin' } }}
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
}

export default CreateCourseStepThree;
