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
import './style.scss';

const steps = ['مشخصات کلی کلاس', 'مشخصات شرکت کنندگان', 'مرحله آخر'];
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
};

// const stepsNew = [{ id: 'مشخصات کلی کلاس' }, { id: 'مشخصات شرکت کنندگان' }, { id: 'مشخصات کلی کلاس' }];

function CreateCourseForm() {
  const [formData, setFormData] = useState(defaultData);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  // const { step, navigation } = useStep({
  //   stepsNew,
  //   initialStep: 0,
  // });
  function getSteps() {
    return ['مشخصات کلی کلاس', 'مشخصات شرکت کنندگان', 'مرحله آخر'];
  }

  // switch (step.id) {
  //   case 'مشخصات کلی کلاس':
  //     return <CreateCourseStepOne {...props}></CreateCourseStepOne>;
  //   case 'مشخصات شرکت کنندگان':
  //     return <CreateCourseStepTwo {...props}></CreateCourseStepTwo>;
  //   case 'مرحله آخر':
  //     return <CreateCourseStepThree {...props}></CreateCourseStepThree>;
  // }

  function getStepsContent(stepIndex) {
    const props = { formData, setFormData };
    switch (stepIndex) {
      case 0:
        return <CreateCourseStepOne {...props}></CreateCourseStepOne>;
      case 1:
        return <CreateCourseStepTwo {...props}></CreateCourseStepTwo>;
      case 2:
        return <CreateCourseStepThree {...props}></CreateCourseStepThree>;
    }
  }

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
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
                  {activeStep == steps.length - 1 ? 'پایان' : 'صفحه‌ی بعد'}
                </Button>
              </div>
            </>
          )}
        </>
      </div>
    </CacheProvider>
  );
}

export default CreateCourseForm;
