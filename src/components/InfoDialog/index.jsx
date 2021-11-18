import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import './style.scss';

const options = [
  'آبی',
  'صورتی',
  'بنفش',
];

function ConfirmationDialogRaw(props) {
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div dir="rtl" className="BG">
      <DialogTitle  className='Center'>رنگی که دوست داری رو انتخاب کن</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="color"
          name="color"
          value={value}
          onChange={handleChange}
        >
          <div className='CenterB'>
          <FormControlLabel className='BlueC' value="Blue" control={<Radio />} label="آبی"/>
          <FormControlLabel className='PinkC' value="Pink" control={<Radio />} label="صورتی" />
          <FormControlLabel className='PurpleC' value="Purple" control={<Radio />} label="بنفش" /></div>
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

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState('Pink');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

    const cacheRtl = createCache({
        key: 'muirtl',
    
        stylisPlugins: [rtlPlugin],
    
        prepend: true
  })

  return (
    <CacheProvider value={cacheRtl}>
    <div dir="rtl" className='Center'>
      {/*<Button variant="outlined" onClick={handleClickOpen} >
        Open form dialog
        </Button>*/}
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle className='Center'>اسمت چیه؟</DialogTitle>
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

      <List component="div" role="group">
        <ConfirmationDialogRaw
          id="color-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ثبت</Button>
        </DialogActions>
        
      </Dialog>
    </div>
    </CacheProvider>
  );
}