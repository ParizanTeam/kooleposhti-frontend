import './style.scss';
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import List from '@mui/material/List';
import { themeProps } from './constant';



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
    <div dir="rtl" style={{align:"center",backgroundColor: themeProps.secondaryColor}}>
      {/*<Button variant="outlined" onClick={handleClickOpen} >
        Open form dialog
        </Button>*/}
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{align:"center",backgroundColor: themeProps.secondaryColor}}>اسمت چیه؟</DialogTitle>
        <DialogContent dividers >
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
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
            label="نام خانوادگی"
            type="text"
            fullWidth
            variant="standard"
          />
           <DialogContent/>   
        </DialogContent>
        <DialogActions style={{align:"center",backgroundColor: themeProps.secondaryColor}}>
          <Button onClick={handleClose}>
            <p className='txtCol'>ثبت</p>
          </Button>
        </DialogActions>
        
      </Dialog>
    </div>
    </CacheProvider>
  );
};

