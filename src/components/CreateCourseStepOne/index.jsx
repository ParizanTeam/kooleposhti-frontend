import React, { useState, useRef } from 'react';
import {
  Grid,
  Box,
  Typography,
  Container,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
} from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import jMoment from 'moment-jalaali';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import rtl from 'jss-rtl';
import './style.scss';

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

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const CreateCourseStepOne = ({ formData, setFormData, activeStep, setActiveStep }) => {
  console.log(activeStep);
  const { courseName, category, image, price, duration, dates, description, courseImage } = formData;
  const [courseNameBlured, setCourseNameBlured] = useState(false);
  const [categoryBlured, setCategoryBlured] = useState(false);
  const [datePickerBlured, setDatePickerBlured] = useState(false);
  const [fileError, setFileError] = useState(false);
  const handleChangeFile = e => {
    var ext = e.target.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
      case 'jpg':
      case 'bmp':
      case 'png':
      case 'tif':
        setFileError(false);
        setFormData(prev => ({ ...prev, courseImage: URL.createObjectURL(e.target.files[0]) }));
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
        break;
      default:
        setFileError(true);
    }
  };

  const handleChange = event => {
    setFormData(prev => ({ ...prev, category: event.target.value }));
  };

  const handleSelectChange = event => {
    handleChange(event);
  };

  const handleNext = () => {
    setCourseNameBlured(true);
    setCategoryBlured(true);
    setDatePickerBlured(true);
    if (courseName != '' && category != '' && dates != '') {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      console.log(dates);
    }
  };
  const handleLast = () => {
    if (activeStep != 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    } else {
      setActiveStep(0);
    }
  };

  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div dir="rtl">
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
            <Box component="form" dir="rtl !important" noValidate setFieldValue sx={{ mt: 1, fontFamily: 'iranyekan' }}>
              <TextField
                dir="rtl !important"
                margin="normal"
                required
                fullWidth
                id="class-name"
                label="اسم کلاس"
                name="courseName"
                error={courseName == '' && courseNameBlured}
                autoFocus
                value={courseName}
                helperText={courseName == '' && courseNameBlured ? 'پرکردن این فیلد الزامی است.' : ''}
                onBlur={() => setCourseNameBlured(true)}
                onChange={e => {
                  setFormData(prev => ({ ...prev, courseName: e.target.value }));
                }}
              />
              <FormControl className="step-one-select-holder" margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-helper-label">موضوع</InputLabel>
                {/* <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={category}
                  margin="normal"
                  fullWidth
                  label="موضوع"
                  required
                  error={category == '' && categoryBlured}
                  name="categoryField"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={1}>مسافرت</MenuItem>
                  <MenuItem value={2}>زیبایی</MenuItem>
                  <MenuItem value={3}>حیوانات</MenuItem>
                  <MenuItem value={4}>بازی</MenuItem>
                  <MenuItem value={5}>مد و لباس</MenuItem>
                  <MenuItem value={6}>کتاب</MenuItem>
                  <MenuItem value={7}>ساختن</MenuItem>
                  <MenuItem value={8}>خوشمزه</MenuItem>
                  <MenuItem value={9}>کاردستی</MenuItem>
                  <MenuItem value={10}>نوزاد</MenuItem>
                  <MenuItem value={11}>ورزشی</MenuItem>
                </Select> */}
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={category}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  margin="normal"
                  fullWidth
                  label="موضوع"
                  required
                  error={category == '' && categoryBlured}
                  name="categoryField"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={'مسافرت'}>مسافرت</MenuItem>
                  <MenuItem value={'زیبایی'}>زیبایی</MenuItem>
                  <MenuItem value={'حیوانات'}>حیوانات</MenuItem>
                  <MenuItem value={'بازی'}>بازی</MenuItem>
                  <MenuItem value={'مد و لباس'}>مد و لباس</MenuItem>
                  <MenuItem value={'کتاب'}>کتاب</MenuItem>
                  <MenuItem value={'ساختن'}>ساختن</MenuItem>
                  <MenuItem value={'خوشمزه'}>خوشمزه</MenuItem>
                  <MenuItem value={'کاردستی'}>کاردستی</MenuItem>
                  <MenuItem value={'نوزاد'}>نوزاد</MenuItem>
                  <MenuItem value={'ورزشی'}>ورزشی</MenuItem>
                </Select>
                <FormHelperText style={{ color: '#D32F2F' }}>
                  {category == '' && categoryBlured ? 'باید حداقل یک گزینه را انتخاب کنید.' : ''}
                </FormHelperText>
              </FormControl>

              <label for="calender" className="step-one-calender__label" style={{ display: 'block' }}>
                تاریخ و زمان کلاس‌ها:
              </label>
              <Grid sx={{ width: { md: '65vmin', sm: '65vmin', xs: '92vmin' } }}>
                <DatePicker
                  onBlur={() => setDatePickerBlured(true)}
                  multiple
                  value={dates}
                  onChange={dateObject => {
                    console.log(dateObject);
                    setFormData(prev => ({ ...prev, dates: dateObject }));
                  }}
                  placeholder="تاریخ و زمان کلاس‌ها"
                  calendar={persian}
                  locale={persian_fa}
                  inputClass={`step-one-datePicker${dates == '' && datePickerBlured ? ' error' : ''}`}
                  format="HH:mm:ss | YYYY/MM/DD "
                  name="datesAndTimes"
                  minDate={new Date()}
                  plugins={[<TimePicker hideSeconds position="bottom" />, <DatePanel position="left" />]}
                  calendarPosition="bottom-right"
                  id="calender"
                />
                <FormHelperText style={{ color: '#D32F2F', marginRight: 14 }}>
                  {dates == '' && datePickerBlured ? 'باید حتما یک روز را انتخاب کنید.' : ''}
                </FormHelperText>
              </Grid>

              <TextField
                id="outlined-multiline-static"
                label="توضیحات کلاس"
                style={{ display: 'block', marginTop: 24 }}
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
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleChangeFile}
              />
              <label htmlFor="contained-button-file">
                <span style={{ display: 'block' }}>
                  <label
                    for="upload-image"
                    className="step-one-calender__label"
                    style={{ display: 'block', marginTop: 32 }}
                  >
                    تصویر کلاس:
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    id="upload-image"
                    className="step-one-button"
                  >
                    انتخاب فایل
                  </Button>
                  <FormHelperText style={{ color: '#D32F2F', marginRight: 14 }}>
                    {fileError && 'فرمت فایل انتخابی صحیح نمی‌باشد.'}
                  </FormHelperText>
                </span>
              </label>
              <Grid sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={courseImage}
                  style={{
                    border: courseImage ? '2px solid blue' : '0px',
                    width: courseImage ? '65vmin' : '0px',
                    // height: courseImage ? '65vmin' : '0px',
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
                  className="steeper-button"
                  onClick={handleLast}
                  disabled={activeStep == 0}
                >
                  صفحه‌ی قبل
                </Button>

                <Button variant="contained" color="primary" className="steeper-button" onClick={handleNext}>
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
