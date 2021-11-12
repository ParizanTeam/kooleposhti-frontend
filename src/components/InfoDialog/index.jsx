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

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);}

    const cacheRtl = createCache({
        key: 'muirtl',
    
        stylisPlugins: [rtlPlugin],
    
        prepend: true
  })

  return (
    <CacheProvider value={cacheRtl}>
    <div dir="rtl">
      {/*<Button variant="outlined" onClick={handleClickOpen} >
        Open form dialog
        </Button>*/}
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>اسمت چیه؟</DialogTitle>
        <DialogContent >
          <DialogContentText>
            اسم کاملت رو بگو تا ثبت نامت رو تکمیل کنیم
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ثبت</Button>
        </DialogActions>
      </Dialog>
    </div>
    </CacheProvider>
  );
}