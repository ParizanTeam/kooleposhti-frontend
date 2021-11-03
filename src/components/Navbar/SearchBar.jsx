import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Box, ButtonGroup, Button, ClickAwayListener, BackdropUnstyled } from '@mui/material';
import { coursesData } from '../CourseSlider/coursesData';
import './style.scss';

const Tags = () => {
  return <div>hey</div>;
};

export default function SearchBar({ onClose }) {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div>
        <Paper
          component="form"
          sx={{
            p: '0 7%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '60px',
            marginTop: '62px',
            position: 'fixed',
            zIndex: '25',
          }}
        >
          <IconButton type="submit" sx={{ p: '10px', color: '#fd576c' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="چی میخوای یاد بگیری؟"
            inputProps={{ 'aria-label': 'سرچ دوره ها' }}
          />
          <IconButton onClick={onClose} sx={{ p: '10px', color: '#fd576c' }} aria-label="search">
            <CloseIcon />
          </IconButton>

        </Paper>
        {/* <Box
          sx={{
            backgroundColor:"white",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: '122px',
            position: 'fixed',
            zIndex: '25',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button>همه</Button>
            <Button>دروس</Button>
            <Button>مدرسین</Button>
          </ButtonGroup>
        </Box> */}

      </div>
    </ClickAwayListener>
  );
}
