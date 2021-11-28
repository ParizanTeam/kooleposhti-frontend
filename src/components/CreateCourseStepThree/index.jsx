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
import { useHistory, Link as routerLink, useParams } from 'react-router-dom';
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
import apiInstance from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { categoriesData } from '../CoursePage';
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

const validationSchema = yup.object({
  email: yup.string('').required('باید حتما ایمیل یا نام کاربریت رو بنویسی تا بتونی وارد بشی.'),
  password: yup.string('').required('باید حتما رمز عبورت رو بنویسی تا بتونی وارد بشی.'),
});

function CreateCourseStepThree(props) {
  const { formData, setFormData, activeStep, setActiveStep, edit = false } = props;
  console.log(activeStep);
  const { tags, price, duration } = formData;
  const params = useParams();
  let courseId;
  if (edit) {
    courseId = params.courseId;
  }
  const [priceBlured, setPriceBlured] = useState(false);
  const [durationBlured, setDurationBlured] = useState(false);
  const [age, setAge] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const text = '';
  //   const [personName, setPersonName] = useState([]);
  const [learnings, setLearnings] = useState([{ learningItem: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ prerequisity: '' }]);

  const handleNext = async () => {
    // console.log(formData);
    setPriceBlured(true);
    setDurationBlured(true);
    console.log(localStorage.getItem('access_token'));
    if (price != '' && duration != '' && isPersianNumber(price) && isPersianNumber(duration)) {
      const data = {
        // categories: formData.category,
        categories: formData.categories
          .map(item => categoriesData.find(elem => elem.title == item))
          .map(item => item.id),
        duration: formData.duration,
        price: formData.price,
        tags: formData.tags.map(tag => ({ name: tag })).filter(tag => tag.name != ''),
        goals: formData.objectives.map(objective => ({ text: objective })).filter(objective => objective.text != ''),
        description: formData.description,
        title: formData.courseName,
        min_age: formData.startAge,
        max_age: formData.endAge,
        max_students: formData.capacity,
        sessions: formData.dates.map(date => ({
          date: `${date.year}-${date.month}-${date.day}`,
          start_time: `${date.hour}:${date.minute}`,
        })),
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      // const data = new FormData();
      // data.append('category', formData.category);
      // data.append('duration', formData.duration);
      // data.append('price', formData.price);
      // data.append('tags', JSON.stringify(formData.tags.map(tag => ({ name: tag })).filter(tag => tag.name != '')));
      // data.append(
      //   'goals',
      //   JSON.stringify(
      //     formData.objectives.map(objective => ({ text: objective })).filter(objective => objective.text != '')
      //   )
      // );
      // data.append('description', formData.description);
      // data.append('title', formData.courseName);
      // data.append('min_age', formData.startAge);
      // data.append('max_age', formData.endAge);
      // data.append('max_students', formData.capacity);
      // data.append(
      //   'sessions',
      //   JSON.stringify(
      //     formData.dates.map(date => ({
      //       date: `${date.year}-${date.month}-${date.day}`,
      //       start_time: `${date.hour}:${date.minute}`,
      //     }))
      //   )
      // );
      // data.append('image', formData.image);
      // console.log(data);
      const imageData = new FormData();
      imageData.append('image', formData.image);
      let id;
      console.log('edit:', edit);
      if (edit) {
        setLoading(true);
        await apiInstance.put(`${baseUrl}/courses/${courseId}/`, data).then(res => {
          console.log(res);
        });
        if (formData.imageChanged) {
          apiInstance
            .patch(`${baseUrl}/courses/${courseId}/`, imageData, {
              headers,
            })
            .then(res => {
              console.log(res.data);
              toast.success('اطلاعات دوره با موفقیت تغییر یافت.');
              setTimeout(() => {
                history.replace('/dashboard/teacher/classes');
                setLoading(false);
              }, 2000);
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
            });
        } else {
          toast.success('اطلاعات دوره با موفقیت تغییر یافت.');
          setTimeout(() => {
            history.replace('/dashboard/teacher/classes');
            setLoading(false);
          }, 2000);
        }
      } else {
        setLoading(true);
        await apiInstance
          .post(`${baseUrl}/courses/`, data)
          .then(res => {
            console.log(res);
            id = res.data.id;
            // toast.success('دوره با موفقیت ایجاد شد.');
            // setTimeout(() => {
            //   history.replace('/dashboard/teacher/classes');
            //   setLoading(false);
            // }, 2000);
          })
          .catch(err => console.log(err));
        if (formData.imageChanged) {
          apiInstance
            .patch(`${baseUrl}/courses/${id}/`, imageData, {
              headers,
            })
            .then(res => {
              console.log(res.data);
              toast.success('دوره با موفقیت ایجاد شد.');
              setTimeout(() => {
                history.replace('/dashboard/teacher/classes');
                setLoading(false);
              }, 2000);
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
            });
        } else {
          toast.success('دوره با موفقیت ایجاد شد.');
          setTimeout(() => {
            history.replace('/dashboard/teacher/classes');
            setLoading(false);
          }, 2000);
        }
      }
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
                autoFocus
                value={convertNumberToPersian(price)}
                onBlur={() => setPriceBlured(true)}
                error={(price == '' || !isPersianNumber(price)) && priceBlured}
                helperText={
                  price == '' && priceBlured
                    ? 'پر کردن این فیلد الزامی است '
                    : priceBlured && !isPersianNumber(price)
                    ? 'باید مقدار عددی وارد کنید.'
                    : ''
                }
                // className="step-one-input-field"
                // value={price}
                onChange={e => {
                  setFormData(prev => ({ ...prev, price: convertNumberToPersian(e.target.value) }));
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
                value={convertNumberToPersian(duration)}
                onBlur={() => setDurationBlured(true)}
                onChange={e => {
                  setFormData(prev => ({ ...prev, duration: convertNumberToPersian(e.target.value) }));
                }}
                error={(duration == '' || !isPersianNumber(duration)) && durationBlured}
                helperText={
                  duration == '' && durationBlured
                    ? 'پر کردن این فیلد الزامی است '
                    : durationBlured && !isPersianNumber(duration)
                    ? 'باید مقدار عددی وارد کنید.'
                    : ''
                }
                sx={{ mb: 1 }}
              />
              <h3 style={{ marginTop: 16, marginBottom: 8 }}>تگ‌های درس</h3>
              <p>
                توجه شود که با انتخاب تگ‌های مناسب، امکان دیده‌شدن درس شما و نمایش آن در نتایج جست‌وجو بیشتر می‌شود.
              </p>
              <div className="step-two-dynamic-input-fields">
                <TextField
                  autoComplete="off"
                  name="learningItem"
                  variant="outlined"
                  label="تگ‌ها"
                  value={tag}
                  sx={{ width: { md: '65vmin  ', sm: '65vmin', xs: '90vmin' }, marginBottom: 1 }}
                  onChange={e => setTag(e.target.value)}
                  onKeyDown={e => {
                    if (e.keyCode == 13) {
                      setFormData(prev => {
                        return { ...prev, tags: [...prev.tags, tag] };
                      });
                      setTag('');
                    }
                  }}
                ></TextField>
                {formData.tags.map(tag => (
                  <Chip
                    style={{ margin: 4 }}
                    label={tag}
                    variant="outlined"
                    onDelete={() => {
                      setFormData(prev => {
                        const index = prev.tags.findIndex(item => item == tag);
                        return { ...prev, tags: prev.tags.filter((item, i) => i != index) };
                      });
                    }}
                  />
                ))}
              </div>

              {/* <h3 className="step-two-dynamic-input-title">تگ های درس</h3>
              <p>
                توجه شود که با انتخاب تگ های مناسب، امکان دیده شدن درس شما و نمایش آن در نتابج جست و جو بیشتر می‌شود
              </p> */}

              {/* {tags.map((tag, index) => (
                <div key={index} className="step-two-dynamic-input-fields">
                  <TextField
                    name="learningItem"
                    label={text}
                    variant="outlined"
                    label={`تگ ${
                      index == 0 ? 'اول' : index == 1 ? 'دوم' : index == 2 ? 'سوم' : index == 3 ? 'چهارم' : ''
                    }`}
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
              ))} */}

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
                  {loading && <ReactLoading className="create-loading" />}
                  {!loading && (activeStep == 2 ? 'پایان' : 'صفحه‌ی بعد')}
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
