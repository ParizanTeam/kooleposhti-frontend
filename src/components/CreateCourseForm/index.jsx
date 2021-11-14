import { React, useState } from 'react';
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

function CreateCourseForm() {
  const params = useParams();
  console.log(params.courseId);
  const courseId = params.courseId;

  const [formData, setFormData] = useState(defaultData);
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
        return <CreateCourseStepThree {...props}></CreateCourseStepThree>;
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
