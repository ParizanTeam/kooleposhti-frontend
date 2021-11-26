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
import {baseUrl} from '../../utils/constants';

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
  category: '',
  price: '',
  duration: '',
  dates: '',
  description: '',
  courseImage: '',
  objectives: ['', '', '', ''],
  tags: ['', '', '', ''],
  capacity: '',
  startAge: '',
  endAge: '',
  age: '',
  image: null,
};

// const stepsNew = [{ id: 'مشخصات کلی کلاس' }, { id: 'مشخصات شرکت کنندگان' }, { id: 'مشخصات کلی کلاس' }];

function CreateCourseForm({ edit }) {
  const params = useParams();
  console.log(params.courseId);
  const courseId = params.courseId;
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    if (edit) {
      apiInstance
        .get(`${baseUrl}/courses/${courseId}`)
        .then(res => {
          console.log(res.data);
          const {
            category,
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
          let defaultTags = ['', '', '', ''];
          for (let i = 0; i < tags.length; i++) {
            const element = tags[i];
            defaultTags[i] = element.name;
          }
          let defaultGoals = ['', '', '', ''];
          for (let i = 0; i < goals.length; i++) {
            const element = goals[i];
            defaultGoals[i] = element.text;
          }
          let defaultSessions = [];
          sessions.forEach(session => {
            // console.log('sessoiin', session);
            const dateNew = new DateObject({
              year: 1400,
              month: 10,
              day: 22,
              calender: persian,
              locale: persian_fa,
            });
            const date = new DateObject({
              year: 1400,
              month: 10,
              day: 22,
              calendar: persian,
              locale: persian_fa,
            });
            console.log('*****************', dateNew);
            console.log('#############', date);
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
              category,
              capacity,
              courseName: title,
              price,
              duration,
              startAge: min_age,
              endAge: max_age,
              age,
              description,
              courseImage: image,
              tags: defaultTags,
              objectives: defaultGoals,
              dates: defaultSessions,
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const [activeStep, setActiveStep] = useState(0);

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
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div className="form-holder-main-class">
        <Stepper alternativeLabel activeStep={activeStep} sx={{ mt: 5, pt: 2, pb: 2 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
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
  );
}

export default CreateCourseForm;
