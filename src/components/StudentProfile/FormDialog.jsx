import './style.scss';
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
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

const options = ['آبی', 'صورتی', 'بنفش'];

export const ConfirmationDialogRaw=(props) => {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

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
  };

  return (
    <div dir="rtl" className="BG">
      <DialogTitle className="Center">رنگی که دوست داری رو انتخاب کن</DialogTitle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label="color" name="color" value={value} onChange={handleChange}>
          <div className="CenterB">
            <FormControlLabel className="BlueC" value="Blue" control={<Radio />} label="آبی" />
            <FormControlLabel className="PinkC" value="Pink" control={<Radio />} label="صورتی" />
            <FormControlLabel className="PurpleC" value="Purple" control={<Radio />} label="بنفش" />
          </div>
        </RadioGroup>
      </DialogContent>
    </div>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export const FormDialog = () => {
  // const userData = useSelector(state => state.auth);
  // const handleChange = prop => event => {
  //   userData[prop] = event.target.value;
  //   // setValues({ ...userData , [prop]: event.target.value });
  // };

  // const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  // console.log('first_name: ', userData.first_name);
  // if (userData.first_name) {
  //   setOpen(false);
  // }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [value, setValue] = React.useState('Pink');

  const handleClickListItem = () => {
    setOpen(true);
  };

  
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
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Dialog open={open} onClose={handleClose}>
          <FormControl>
            <DialogTitle>اسمت چیه؟</DialogTitle>
            <DialogContent>
              <DialogContentText>اسم کاملت رو بگو تا ثبت نامت رو تکمیل کنیم</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                // value={userData.first_name}
                // onChange={handleChange('first_name')}
                label="نام"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                // value={userData.last_name}
                // onChange={handleChange('last_name')}
                label="نام خانوادگی"
                type="text"
                fullWidth
                variant="standard"
              />
              <List component="div" role="group">
                <ConfirmationDialogRaw id="color-menu" keepMounted open={open} onClose={handleClose} value={value} />
              </List>
            </DialogContent>
            <DialogActions>
              <Button typeof="submit" type="submit" onClick={handleClose}>
                ثبت
              </Button>
            </DialogActions>
          </FormControl>
        </Dialog>
      </div>
    </CacheProvider>
  );
};

