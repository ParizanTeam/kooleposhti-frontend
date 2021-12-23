import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Box, ButtonGroup, Button, ClickAwayListener, AppBar } from '@mui/material';
import { coursesData } from '../CourseSlider/coursesData';
import './style.scss';
import { navbarProps } from './constants';
import { useHistory } from 'react-router-dom';

export default function SearchBar({ onClose, open }) {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const handleSearch = () => {
    console.log(`/classes?search=${search}`);
    history.push(`/classes?search=${search}`);
  };
  return (
    <>
      {open && (
        <ClickAwayListener onClickAway={onClose}>
          <AppBar sx={{ zIndex: '25' }}>
            <Paper onSubmit={handleSearch} component="form" className="navbar__search-bar">
              <IconButton type="submit" sx={{ p: '10px', color: navbarProps.baseColor }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="چی میخوای یاد بگیری؟"
                inputProps={{ 'aria-label': 'سرچ دوره ها' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <IconButton onClick={onClose} sx={{ p: '10px', color: navbarProps.baseColor }} aria-label="search">
                <CloseIcon />
              </IconButton>
            </Paper>
          </AppBar>
        </ClickAwayListener>
      )}
    </>
  );
}
