import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import profile_1 from '../../assets/images/child1.jpg';
import { useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import apiInstance from '../../utils/axiosConfig';
import AlertDialog from '../AlertDialog';
import { baseUrl } from '../../utils/constants';
import StudentProfileModalCard from '../StudentProfileModalCard';
import './style.scss';

function ClassStudentInfo(props) {
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [showProfile, setShowProfile] = useState({ profileOpen: false, username: '' });

  const params = useParams();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

  const token = 'JWT ' + localStorage.getItem('access_token');
  const courseId = params.courseId;

  useEffect(() => {
    async function fetchData() {
      const res = await apiInstance
        .get(`${baseUrl}/courses/${courseId}/students/`)
        .then(response => {
          console.log('get response: ', response);
          setStudentsInfo(response.data);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
    fetchData();
  }, []);

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

  function createData(img, studentName, email, id) {
    return { img, studentName, email, id };
  }

  //ask why

  const rows = [];
  studentsInfo.forEach(item => {
    rows.push(
      createData(
        <Avatar src={item.image} alt="profile" sx={{ borderRadius: '50%' }} />,
        item.username,
        item.email,
        item.id
      )
    );
  });

  const DeleteStudent = async inputRow => {
    console.log('hello world');
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    console.log('row before is: ' + inputRow);
    console.log('students info before: ' + studentsInfo);
    // async function fetchData() {
    const delRes = await apiInstance
      .put(`${baseUrl}/courses/${courseId}/delete-student/${inputRow.id}/`)
      .then(response => {
        console.log('get response: ', response);
        console.log(inputRow.id);
        const updatedTable = studentsInfo.filter(row => row.id != inputRow.id);
        setStudentsInfo(updatedTable);
        console.log(studentsInfo);
        console.log(updatedTable);
      })
      .catch(err => {
        console.log('error: ', err);
      });
    // }
    // const updatedTable = studentsInfo.filter(row => row != inputRow);
    // setStudentsInfo(updatedTable);
  };

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <div dir="rtl">
          {/* <Helmet>
          <title>پروفایل</title>
        </Helmet> */}
          <ToastContainer />

          <Box component="form" noValidate sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}></Grid>
              <Grid item sm={6} xs={12}></Grid>
            </Grid>
          </Box>

          <Grid sx={{ margin: '40px 10px 10px 0px' }}>
            <ToastContainer rtl={true} />
            <TableContainer className="student-info-table-container" style={{ boxShadow: '10px solid' }}>
              <Table aria-label="customized table" className="student-info-table">
                <TableHead style={{ borderRadius: '10px' }}>
                  <TableRow>
                    <StyledTableCell
                      align="center"
                      sx={{ fontSize: 14, backgroundColor: 'rgba(10, 67, 94, 0.942)', color: 'white' }}
                    >
                      عکس دانش‌آموز
                    </StyledTableCell>
                    <StyledTableCell align="center">نام کاربری دانش‌آموز</StyledTableCell>
                    <StyledTableCell align="center">ایمیل دانش‌آموز</StyledTableCell>
                    <StyledTableCell align="center">حذف دانش‌آموز</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        align="center"
                        className="course-student-info-table__image-holder"
                        onClick={() => {
                          setShowProfile({ profileOpen: true, username: row.studentName });
                          console.log({ showProfile });
                        }}
                      >
                        {row.img}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.studentName}</StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      <StyledTableCell align="center">
                        {/* ask why */}
                        <CloseIcon
                          onClick={() => {
                            console.log('hahahah');
                            console.log(row.id);
                            //   DeleteStudent(row);
                            setConfirmDialog({
                              isOpen: true,
                              title: 'مدرس محترم',
                              subtitle: 'مطمئنی میخوای این دانش آموز رو حذف کنی؟',
                              onConfirm: () => {
                                DeleteStudent(row);
                              },
                            });
                          }}
                          className="student-info-form__close-icon"
                        ></CloseIcon>
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">{row.capacity}</StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </div>
      </CacheProvider>
      <AlertDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <StudentProfileModalCard showProfile={showProfile} setShowProfile={setShowProfile} />
    </>
  );
}

export default ClassStudentInfo;
