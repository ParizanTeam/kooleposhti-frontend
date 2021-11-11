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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
//   };
// }

const validationSchema = yup.object({
  email: yup.string('').required('باید حتما ایمیل یا نام کاربریت رو بنویسی تا بتونی وارد بشی.'),
  password: yup.string('').required('باید حتما رمز عبورت رو بنویسی تا بتونی وارد بشی.'),
});

function CreateCourseStepTwo() {
  //   const theme = useTheme();
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  //   const [personName, setPersonName] = useState([]);
  const [learnings, setLearnings] = useState([{ learningItem: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ prerequisity: '' }]);
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

  //   const handleChange = event => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a the stringified value.
  //       typeof value === 'string' ? value.split(',') : value
  //     );
  //   };

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
                id="email"
                label="ظرفیت کلاس"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="رمز عبور"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ fontFamily: 'iranyekan' }}
              /> */}

              {/* <FormControl className="step-one-dropdown-holder" sx={{ mb: 1 }}>
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
              </FormControl> */}

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">رده سنی</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  label="رده سنی"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>کمتر از ۱۰</MenuItem>
                  <MenuItem value={2}>بین ۱۰ و ۱۵</MenuItem>
                  <MenuItem value={3}>بین ۱۵ و ۲۰</MenuItem>
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>

              <h3>با شرکت در کلاس شما، چه چیزی یاد می‌گیریم؟</h3>

              {learnings.map((learnItem, index) => (
                <div key={index}>
                  <IconButton>
                    <AddIcon onClick={() => handleAddLearnings()}></AddIcon>
                  </IconButton>
                  <IconButton>
                    <RemoveIcon onClick={index => handleRemoveLearnings(index)}></RemoveIcon>
                  </IconButton>
                  <TextField
                    name="learningItem"
                    label="مورد اول"
                    variant="outlined"
                    value={learnItem.learningItem}
                    onChange={event => handleLearningChange(index, event)}
                  ></TextField>
                </div>
              ))}

              <h3>پیش نیازهای شرکت در کلاس</h3>

              {prerequisites.map((prerequisitiesItem, index) => (
                <div key={index}>
                  <IconButton>
                    <AddIcon onClick={() => handleAddPrerequisties()}></AddIcon>
                  </IconButton>
                  <IconButton>
                    <RemoveIcon onClick={index => handleRemovePrerequisties(index)}></RemoveIcon>
                  </IconButton>
                  <TextField
                    name="learningItem"
                    label="مورد اول"
                    variant="outlined"
                    value={prerequisitiesItem.prerequisity}
                    onChange={event => handlePrerequistiesChange(index, event)}
                  ></TextField>
                </div>
              ))}

              {/* <Card sx={{ mt: 3 }}>
                <CardHeader title="با شرکت در این کلاس، چه می‌آموزیم؟" />
                <CardContent>
                  <TextField
                    id="what-we-learn-text-field"
                    name="learn-fields"
                    label="آموزه اول"
                    variant="outlined"
                  ></TextField>
                  <Button variant="outlined" color="secondary" className="btn3">
                    پاک کردن
                  </Button>
                </CardContent>
                <hr />
                <CardActions>
                  <div>
                    <Button variant="outlined" color="primary" className="btn">
                      اضافه کردن
                    </Button>
                  </div>
                </CardActions>
              </Card> */}
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
}

export default CreateCourseStepTwo;
