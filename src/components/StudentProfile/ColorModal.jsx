import './style.scss';
import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import ColorPlate from '../../assets/images/color_plate.png';
import color_papers from '../../assets/images/color_papers.jpg';
import { change_profile_color } from '../../store/actions';
import { colorMap } from './constant';

export const ConfirmationDialogRaw = props => {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleChange = event => {
    setValue(event.target.value);
    dispatch(change_profile_color(event.target.value));
  };

  return (
    <div dir="rtl" className="BG">
      <DialogTitle className="student-profile__color-modal">
        رنگی که دوست داری رو انتخاب کن
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label="color" name="color" value={value} onChange={handleChange}>
          <div className="CenterB">
            {Object.entries(colorMap).map(([color, val]) => (
              <FormControlLabel
                className="colorBox"
                value={color}
                control={<Radio />}
                label={val.label}
                style={{ color: val.primaryColor, backgroundColor: val.secondaryColor }}
              />
            ))}
          </div>
        </RadioGroup>
      </DialogContent>
    </div>
  );
};

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export const ColorModal = () => {
  const [open, setOpen] = React.useState(false);
  const themeProps = useSelector(state => state.theme);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [value, setValue] = React.useState('Pink');

  const handleClose = () => {
    setOpen(false);

    // axios
    //   .put(`${baseUrl}/accounts/students/me/`, {first_name:userData.first_name,last_name:userData.last_name}, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .catch(err => console.log(err.response));
    // dispatch(login());
  };

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  return (
    <>
      <Button onClick={handleClickOpen} size="large" sx={{margin:"auto"}}>
        <img src={ColorPlate} style={{ width: '50px', marginLeft: '10px' }} />
        <Typography variant="h5">
          <span style={{ color: 'steelblue' }}>ر</span>
          <span style={{ color: 'lightcoral' }}>ن&zwj;</span>
          <span style={{ color: '	mediumaquamarine' }}>گ</span>
          &nbsp;
          <span style={{ color: 'cornflowerblue' }}>پ&zwj;</span>
          <span style={{ color: 'pink' }}>ر</span>
          <span style={{ color: 'aqua' }}>و</span>
          <span style={{ color: 'orange' }}>ف&zwj;</span>
          <span style={{ color: 'indianred' }}>ا</span>
          <span style={{ color: 'green' }}>ی&zwj;</span>
          <span style={{ color: 'deepskyblue' }}>ل</span>
          &nbsp;
          <span style={{ color: 'mediumturquoise' }}>م&zwj;</span>
          <span style={{ color: '	slategray' }}>ن</span>
        </Typography>
      </Button>

      <CacheProvider value={cacheRtl}>
        <div dir="rtl">
          <Dialog open={open} onClose={handleClose}>
            <List component="div" role="group" style={{ align: 'center' }}>
              <ConfirmationDialogRaw id="color-menu" keepMounted open={open} onClose={handleClose} value={value} />
            </List>
            <DialogActions
            className="student-profile__color-modal__submit-btn"
              style={{ marginTop: '-10px' }}
            >
              <a href='#' onClick={handleClose}>
                ثبت
              </a>
            </DialogActions>
          </Dialog>
        </div>
      </CacheProvider>
    </>
  );
};

export default ColorModal;
