import React from 'react';
import { Stepper, Step, StepLabel, Box, Typography, Button } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { CacheProvider } from '@emotion/react';
import rtl from 'jss-rtl';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

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
        return 'ثبت نام اولیه (اول)';
      case 1:
        return 'ثبت نام وسطی (دوم)';
      case 2:
        return 'ثبت نام آخر (سوم)';
    }
  }

  const steps = getSteps();
  const classes = useStyles();
  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <Stepper className={classes.root} alternativeLabel sx={{ mt: 5, pt: 2, pb: 2 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </CacheProvider>
  );
}

export default CreateCourseForm;
