import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import{ ClickAwayListener } from "@mui/material";
import './style.scss';

export default function SearchBar({ onClose }) {
  return (
    <>
    <div class="overlay"></div>
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          component="form"
          sx={{ p: '0 7%', display: 'flex', alignItems: 'center',justifyContent: 'center', width: '100%', height: '60px', marginTop: '70px' }}
        >
          <IconButton type="submit" sx={{ p: '10px',color: '#fd576c' }} aria-label="search">
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
      </ClickAwayListener>
    </>
  );
}
