import { React, useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, Button } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { CacheProvider } from '@emotion/react';
import rtl from 'jss-rtl';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import CreateCourseStepOne from '../CreateCourseStepOne';
import CreateCourseStepTwo from '../CreateCourseStepTwo';
import CreateCourseStepThree from '../CreateCourseStepThree';
import { useParams } from 'react-router';
import './style.scss';
import apiInstance from '../../utils/axiosConfig';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { convertNumberToPersian } from '../../utils/helpers';
import { baseUrl } from '../../utils/constants';
import { categoriesData } from '../CoursePage';
import CourseLoader from '../CourseLoader';
import { Fragment } from 'react';

const steps = ['صفحه‌ی اول', 'صفحه‌ی دوم', 'صفحه‌ی آخر'];
//const classes = useStyle();

const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: '6rem auto',
    border: '1px solid #999',
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

const defaultData = {
  courseName: '',
  categories: [],
  price: '',
  duration: '',
  dates: [],
  description: '',
  courseImage: '',
  objectives: ['', '', '', ''],
  tags: [],
  capacity: '',
  startAge: '',
  endAge: '',
  age: '',
  image: null,
  imageChanged: false,
};

// const stepsNew = [{ id: 'مشخصات کلی کلاس' }, { id: 'مشخصات شرکت کنندگان' }, { id: 'مشخصات کلی کلاس' }];

function CreateCourseForm({ edit }) {
  const params = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  console.log(params.courseId);
  const courseId = params.courseId;
  const [formData, setFormData] = useState(defaultData);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [activeStep]);

  useEffect(() => {
    if (edit) {
      setLoadingData(true);
      apiInstance
        .get(`${baseUrl}/courses/${courseId}`)
        .then(res => {
          console.log(res.data);
          const {
            categories,
            tags,
            goals,
            description,
            image,
            capacity,
            title,
            price,
            duration,
            min_age,
            max_age,
            sessions,
          } = res.data;
          let age;
          let defaultTags = tags.map(tag => tag.name);
          let defaultGoals = ['', '', '', ''];
          for (let i = 0; i < goals.length; i++) {
            const element = goals[i];
            defaultGoals[i] = element.text;
          }
          let defaultSessions = [];
          sessions.forEach(session => {
            console.log('session:  ', session);
            const newDate = new DateObject({
              date: `${session.date.split('-')[0]}/${session.date.split('-')[1]}/${session.date.split('-')[2]} | ${
                session.start_time.split(':')[0]
              }:${session.start_time.split(':')[1]}`,
              format: 'YYYY/MM/DD | HH:mm',
              calendar: persian,
              locale: persian_fa,
            });
            defaultSessions.push(newDate);
            // console.log('sessoiin', session);
            // const dateNew = new DateObject({
            //   year: 1400,
            //   month: 10,
            //   day: 22,
            //   calender: persian,
            //   locale: persian_fa,
            // });
            // const date = new DateObject({
            //   year: 1400,
            //   month: 10,
            //   day: 22,
            //   calendar: persian,
            //   locale: persian_fa,
            // });
            // console.log('*****************', dateNew);
            // console.log('#############', date);
            // date.setHour(session.start_time.slice(0, 2));
            // date.setMinute(session.start_time.slice(3, 5));
            // date.setSecond(0);
            // date.year = +session.date.slice(0, 4) + 621;
            // console.log('yersdfsdfsdfsdfsdfs', date.year);
            // date.month = session.date.slice(5, 7);
            // date.day = session.day;
            // date.setDay(session.day);
            // date.setMonth(session.date.slice(5, 7));
            // date.setYear(session.date.slice(0, 4));
            // defaultSessions.push(dateNew);
          });
          console.log('#############');
          console.log(defaultSessions);
          if (min_age == 4 && max_age == 7) {
            age = 1;
          } else if (min_age == 7 && max_age == 10) {
            age = 2;
          } else if (min_age == 10 && max_age == 13) {
            age = 3;
          } else if (min_age == 13 && max_age == 18) {
            age = 4;
          } else if (min_age == 4 && max_age == 10) {
            age = 5;
          } else if (min_age == 10 && max_age == 18) {
            age = 6;
          } else if (min_age == 4 && max_age == 18) {
            age = 7;
          }

          setFormData(prev => {
            return {
              ...prev,
              categories: categories.map(cat => categoriesData[cat - 1].title),
              capacity,
              courseName: title,
              price,
              duration,
              startAge: min_age,
              endAge: max_age,
              age,
              description,
              courseImage: image == `${baseUrl}/media/images/no_photo.jpg` ? null : image,
              tags: defaultTags,
              objectives: defaultGoals,
              dates: defaultSessions,
            };
          });
          setLoadingData(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  function getSteps() {
    return ['مشخصات کلی کلاس', 'مشخصات شرکت کنندگان', 'مرحله آخر'];
  }

  const steps = getSteps();

  function getStepsContent(stepIndex) {
    const props = { formData, setFormData, activeStep, setActiveStep };
    switch (stepIndex) {
      case 0:
        return <CreateCourseStepOne {...props}></CreateCourseStepOne>;
      case 1:
        return <CreateCourseStepTwo {...props}></CreateCourseStepTwo>;
      case 2:
        return <CreateCourseStepThree edit={edit} {...props}></CreateCourseStepThree>;
    }
  }

  return (
    <Fragment>
      {loadingData && <CourseLoader />}
      {!loadingData && (
        <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
          <div className="form-holder-main-class">
            <Stepper alternativeLabel activeStep={activeStep} sx={{ mt: 5, pt: 2, pb: 2 }}>
              {steps.map((label, i) => (
                <Step key={label}>
                  <StepLabel icon={convertNumberToPersian(i + 1)}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                'مراحل با موفقیت به اتمام رسید.'
              ) : (
                <>
                  {getStepsContent(activeStep)}
                  {/* <div className="steeper-button__holder">
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
                  {activeStep == steps.length - 1 ? 'پایان' : 'صفحه‌ی بعد'}
                </Button>
              </div> */}
                </>
              )}
            </>
          </div>
        </CacheProvider>
      )}
    </Fragment>
  );
}

export default CreateCourseForm;
