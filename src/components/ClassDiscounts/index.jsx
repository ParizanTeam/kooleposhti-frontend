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
import { useHistory } from 'react-router-dom';
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

function ClassDiscounts() {
  const [discountsInfo, setDiscountsInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState({ profileOpen: false, username: '' });
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState(new Date().toString());
  const [percentage, setPercentage] = useState('');
  const [id, setId] = useState();
  const [titleBlured, setTitleBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);
  const [percentageBlured, setPercentageBlured] = useState(false);
  const [tableDate, setTableDate] = useState();
  const history = useHistory();
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
        .get(`${baseUrl}/discounts/codes/${courseId}`)
        .then(response => {
          console.log('get response: ', response);
          setDiscountsInfo(response.data);
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

  const convertDateToJalali = input => {
    const JDate = require('jalali-date');
    const date = new Date(input);
    const jdate = new JDate(date).format('dddd DD MMMM YYYY');
    return `${jdate} ساعت ${date.getHours()}:${date.getMinutes()}`;
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(code, expiration_date, discount, used_no, id) {
    return { code, expiration_date, discount, used_no, id };
  }

  const DeleteCode = async inputRow => {
    console.log('hello world');
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    console.log('row before is: ' + inputRow);
    // console.log('students info before: ' + studentsInfo);
    setRegisterLoading(true);
    // async function fetchData() {
    const delRes = await apiInstance
      .delete(`${baseUrl}/discounts/${inputRow.id}/`)
      .then(response => {
        console.log('get response: ', response);
        console.log(inputRow.id);
        const updatedTable = discountsInfo.filter(row => row.id != inputRow.id);
        setDiscountsInfo(updatedTable);
        console.log(discountsInfo);
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

  const rows = [];
  discountsInfo.forEach(item => {
    rows.push(createData(item.code, item.expiration_date, item.discount, item.used_no, item.id));
  });

  console.log('&&&&&&&&&&&&&&&', discountsInfo);
  console.log(endDate);
  console.log(endDate.toString().length);
  return (
    <>
      <Helmet>
        <title>کدهای تخفیف</title>
      </Helmet>
      <h3 style={{ marginBottom: 16 }}>کدهای تخفیف این کلاس</h3>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
        </div>
      ) : (
        <Fragment>
          {discountsInfo.length == 0 ? (
            <>
              <div style={{ marginTop: 20 }}>
                <h4>هنوز کد تخفیفی برای این کلاس ثبت نشده.</h4>
              </div>
              <div>
                <button
                  className="classDiscount__create-button"
                  onClick={() => history.push(`/dashboard/class/${params.classId}/discounts/create`)}
                >
                  اضافه کردن کد تخفیف
                </button>
              </div>
            </>
          ) : (
            <CacheProvider value={cacheRtl}>
              <div dir="rtl">
                <Box component="form" noValidate sx={{ mt: 5 }}>
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}></Grid>
                    <Grid item sm={6} xs={12}></Grid>
                  </Grid>
                </Box>

                <div>
                  <button
                    className="classDiscount__create-button"
                    onClick={() => history.push(`/dashboard/class/${params.classId}/discounts/create`)}
                  >
                    اضافه کردن کد تخفیف
                  </button>
                </div>
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
                          <StyledTableCell align="center">حذف کد</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <StyledTableRow key={row.id}>
                            <StyledTableCell align="center" className="course-student-info-table__image-holder">
                              {row.code}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {convertNumberToPersian(convertDateToJalali(row.expiration_date))}
                            </StyledTableCell>
                            <StyledTableCell align="center">{convertNumberToPersian(row.discount)}</StyledTableCell>
                            <StyledTableCell align="center">{convertNumberToPersian(row.used_no)}</StyledTableCell>
                            <StyledTableCell align="center">
                              {/* ask why */}
                              <CloseIcon
                                onClick={() => {
                                  setOpenModal(true);
                                  setModalConfirm(() => {
                                    return () => DeleteCode(row);
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
          )}
        </Fragment>
      )}
      {/* <AlertDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} /> */}

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
            <h4 className="register-modal__title">آیا از حذف این کد تخفیف مطمئن هستید؟</h4>
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
    </>
  );
}

export default ClassDiscounts;
