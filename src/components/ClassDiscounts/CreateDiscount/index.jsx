import React, { useState, useEffect, useRef } from 'react';
import SignupIcon from '@mui/icons-material/AccountCircle';
import ReactLoading from 'react-loading';
import Avatar from '@mui/material/Avatar';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { convertNumberToEnglish, convertNumberToPersian } from '../../utils/helpers';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
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
import { Modal, Fade, Backdrop } from '@mui/material';
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
import { Fragment } from 'react';

function CreateDiscount() {
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState({ profileOpen: false, username: '' });
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');
  const [percentage, setPercentage] = useState('');
  const [titleBlured, setTitleBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);
  const [percentageBlured, setPercentageBlured] = useState(false);
  const endDatePickerRef = useRef(null);

  const params = useParams();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

  const token = 'JWT ' + localStorage.getItem('access_token');
  const courseId = params.classId;

  const handleClose = () => {
    setOpenModal(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await apiInstance
        .get(`${baseUrl}/courses/${courseId}/students/`)
        .then(response => {
          console.log('get response: ', response);
          setStudentsInfo(response.data);
          setLoading(false);
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
      backgroundColor: 'rgb(227, 95, 120)',
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

  function createData(discountCode, end, percentage, userNumbers) {
    return { discountCode, end, percentage, userNumbers };
  }

  //ask why

  const rows = [];
  studentsInfo.forEach(item => {
    rows.push(createData(item.discountCode, item.end, item.percentage, item.userNumbers));
  });

  const DeleteStudent = async inputRow => {
    console.log('hello world');
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    console.log('row before is: ' + inputRow);
    console.log('students info before: ' + studentsInfo);
    setRegisterLoading(true);
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
        toast.success('دانش‌آموز با موفقیت حذف شد.');
        setOpenModal(false);
        setRegisterLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
        setOpenModal(false);
        toast.error('مشکلی در سامانه رخ داده‌است.');
        setRegisterLoading(false);
      });
    // }
    // const updatedTable = studentsInfo.filter(row => row != inputRow);
    // setStudentsInfo(updatedTable);
  };
  console.log('&&&&&&&&&&&&&&&', studentsInfo);
  return (
    <>
      <h3 style={{ marginBottom: 16 }}>کدهای تخفیف این کلاس</h3>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
        </div>
      ) : (
        <Fragment>
          {
            /*studentsInfo.length*/ 0 == 0 ? (
              <>
                <div className="discount-page__title"> کد تخفیفی برای این کلاس ثبت نشده است.</div>
                <div>
                  <label htmlFor="title" className="kp-text-input__label">
                    متن کد تخفیف:
                  </label>
                  <input
                    type="text"
                    placeholder="متن کد تخفیف"
                    onBlur={() => setTitleBlured(true)}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="kp-text-input__input discount-page-input__title"
                    id="title"
                  />
                  {titleBlured && title == '' && (
                    <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>عنوان تمرین نمی‌تواند خالی باشد.</div>
                  )}
                </div>
                <div className="discount-page__second-row">
                  <div style={{ flexGrow: 1 }}>
                    <label htmlFor="title" className="kp-text-input__label">
                      تاریخ پایان اعتبار کد تخفیف
                    </label>
                    <input
                      type="text"
                      placeholder="انتخاب تاریخ پایان اعتبار کد تخفیف"
                      onBlur={() => setEndDateBlured(true)}
                      onFocus={() => endDatePickerRef.current.openCalendar()}
                      onClick={() => endDatePickerRef.current.openCalendar()}
                      value={
                        endDate
                          ? convertNumberToPersian(`${endDate.toString()} ساعت ${endDate.hour}:${endDate.minute}`)
                          : ''
                      }
                      onChange={e => setEndDate(e.target.value)}
                      className="kp-text-input__input discount-page-input__end-date"
                      id="title"
                    />
                    {endDateBlured && endDate == '' && (
                      <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>
                        زمان پایان تمرین نمیتواند خالی باشد.
                      </div>
                    )}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <label htmlFor="title" className="kp-text-input__label">
                      درصد تخفیف
                    </label>
                    <input
                      type="text"
                      placeholder="درصد تخفیف"
                      onBlur={() => setPercentageBlured(true)}
                      value={percentage}
                      onChange={e => setPercentage(e.target.value)}
                      className="kp-text-input__input discount-page-input__percentage"
                      id="title"
                    />
                    {percentageBlured && percentage == '' && (
                      <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>درصد تخفیف نمیتواند خالی باشد.</div>
                    )}
                  </div>
                </div>

                <DatePicker
                  ref={endDatePickerRef}
                  inputClass="date-input"
                  minDate={new Date()}
                  className="rmdp-mobile"
                  onChange={date => {
                    setEndDate(date);
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  minDate={new Date()}
                  plugins={[<TimePicker hideSeconds position="bottom" />]}
                />
              </>
            ) : (
              <CacheProvider value={cacheRtl}>
                <div dir="rtl">
                  {/* <Helmet>
          <title>پروفایل</title>
        </Helmet> */}

                  <Box component="form" noValidate sx={{ mt: 5 }}>
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}></Grid>
                      <Grid item sm={6} xs={12}></Grid>
                    </Grid>
                  </Box>

                  <Grid sx={{ margin: '40px 10px 10px 0px' }}>
                    <TableContainer className="student-info-table-container" style={{ boxShadow: '10px solid' }}>
                      <Table aria-label="customized table" className="student-info-table">
                        <TableHead style={{ borderRadius: '10px' }}>
                          <TableRow>
                            <StyledTableCell
                              align="center"
                              sx={{ fontSize: 14, backgroundColor: 'rgba(10, 67, 94, 0.942)', color: 'white' }}
                            >
                              کد تخفیف
                            </StyledTableCell>
                            <StyledTableCell align="center">تاریخ پایان کد تخفیف</StyledTableCell>
                            <StyledTableCell align="center">درصد تخفیف</StyledTableCell>
                            <StyledTableCell align="center">تعداد دانش آموزان</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <StyledTableRow key={row.id}>
                              <StyledTableCell
                                style={{ display: 'flex', justifyContent: 'center' }}
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
                                    setOpenModal(true);
                                    setModalConfirm(() => {
                                      return () => DeleteStudent(row);
                                    });
                                    // console.log('hahahah');
                                    // console.log(row.id);
                                    //   DeleteStudent(row);
                                    // setConfirmDialog({
                                    //   isOpen: true,
                                    //   title: 'مدرس محترم',
                                    //   subtitle: 'مطمئنی میخوای این دانش آموز رو حذف کنی؟',
                                    //   onConfirm: () => {
                                    //     DeleteStudent(row);
                                    //   },
                                    // });
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
            )
          }
        </Fragment>
      )}
      {/* <AlertDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} /> */}
      <StudentProfileModalCard showProfile={showProfile} setShowProfile={setShowProfile} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className="register-modal">
            <h4 className="register-modal__title">آیا از حذف این دانش‌آموز مطمئن هستید؟</h4>
            <button className="register-modal__confirm" onClick={handleClose}>
              بازگشت
            </button>
            <button className="register-modal__cancel" onClick={modalConfirm}>
              حذف
            </button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {registerLoading && <ReactLoading type="bubbles" color="#000" />}
            </div>
          </div>
        </Fade>
      </Modal>

      <DatePicker
        ref={endDatePickerRef}
        inputClass="date-input"
        className="rmdp-mobile"
        onChange={date => {
          setEndDate(date);
        }}
        calendar={persian}
        locale={persian_fa}
        plugins={[<TimePicker hideSeconds position="bottom" />]}
      />
    </>
  );
}

export default CreateDiscount;
