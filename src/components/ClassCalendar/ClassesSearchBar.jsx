import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {ClickAwayListener} from '@mui/material';
//import { coursesData } from '../CourseSlider/coursesData';
import './style.scss';

/*const Tags = () => {
  return <div>hey</div>;
};*/

export default function ClassesSearchBar({ onClose }) {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div>
        <Paper className="Searching"
          component="form"
          sx={{
            p: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70px',
          }}
        >
          <IconButton type="submit" sx={{ p: '10px', color: '#fd576c' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="دنبال چی می‌گردی؟"
            inputProps={{ 'aria-label': 'سرچ دوره ها' }}
          />
          <IconButton onClick={onClose} sx={{ p: '10px', color: '#fd576c' }} aria-label="search">
            <CloseIcon />
          </IconButton>
        </Paper>
      </div>
    </ClickAwayListener>
  );
}
