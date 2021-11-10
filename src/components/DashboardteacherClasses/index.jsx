import React, { useState } from 'react';
import SignupIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import profile_1 from '../../assets/images/profile_2.png';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import './style.scss';
function DashboardTeacherClasses(props) {
  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgba(10, 67, 94, 0.942)',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(img, subject, start_date, end_date, capacity) {
    return { img, subject, start_date, end_date, capacity };
  }

  const rows = [
    createData(
      <Avatar src={profile_1} alt="profile" sx={{ height: '0', width: '7vmin', borderRadius: '50%' }} />,
      159,
      6.0,
      24,
      4.0
    ),
    createData(
      <Avatar src={profile_1} alt="profile" sx={{ height: '0', width: '7vmin', borderRadius: '50%' }} />,
      237,
      9.0,
      37,
      4.3
    ),
    createData(
      <Avatar src={profile_1} alt="profile" sx={{ height: '0', width: '7vmin', borderRadius: '50%' }} />,
      262,
      16.0,
      24,
      6.0
    ),
    createData(
      <Avatar src={profile_1} alt="profile" sx={{ height: '0', width: '7vmin', borderRadius: '50%' }} />,
      305,
      3.7,
      67,
      4.3
    ),
    createData(
      <Avatar src={profile_1} alt="profile" sx={{ height: '0', width: '7vmin', borderRadius: '50%' }} />,
      356,
      16.0,
      49,
      3.9
    ),
  ];

  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Helmet>
          <title>پروفایل</title>
        </Helmet>
        <ToastContainer />

        <Box component="form" noValidate sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(10, 67, 94, 0.942)',
                  width: {sm:'22.5vmin' , xs:"140px"},
                  display: 'flex',
                  flexGrow: 1,
                  
                }}
              >
                <Typography variant="body" >ایجاد کلاس جدید</Typography>
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}></Grid>
          </Grid>
        </Box>

        <Grid sx={{ margin: '40px 10px 10px 0px' }}>
          <ToastContainer rtl={true} />
          <TableContainer >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ fontSize: 14, backgroundColor: 'rgba(10, 67, 94, 0.942)', color: 'white' }}>
                    تصویر کلاس
                  </StyledTableCell>
                  <StyledTableCell align="left">عنوان کلاس</StyledTableCell>
                  <StyledTableCell align="left">تاریخ شروع کلاس</StyledTableCell>
                  <StyledTableCell align="left">تاریخ پایان کلاس</StyledTableCell>
                  <StyledTableCell align="left">ظرفیت کلاس</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.subject}>
                    <StyledTableCell component="th" scope="row">
                      {row.img}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.subject}</StyledTableCell>
                    <StyledTableCell align="left">{row.start_date}</StyledTableCell>
                    <StyledTableCell align="left">{row.end_date}</StyledTableCell>
                    <StyledTableCell align="left">{row.capacity}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherClasses;
