import { React, useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, Button } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { CacheProvider } from '@emotion/react';
import rtl from 'jss-rtl';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import CreateCourseStepOne from '../CreateCourseStepOne';
import './style.scss';

const steps = ['ثبت نام اولیه', 'ثبت نام وسطی', 'مرحله آخر'];
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

function CreateCourseForm() {
  function getSteps() {
    return ['ثبت نام اولیه', 'ثبت نام وسطی', 'مرحله آخر'];
  }

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <CreateCourseStepOne></CreateCourseStepOne>;
      case 1:
        return 'ثبت نام وسطی (دوم)';
      case 2:
        return 'ثبت نام آخر (سوم)';
    }
  }

  const steps = getSteps();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
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
                  component="span"
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
