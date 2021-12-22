import React, { useState, useEffect, useRef } from 'react';
import SignupIcon from '@mui/icons-material/AccountCircle';
import ReactLoading from 'react-loading';
import Avatar from '@mui/material/Avatar';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { convertNumberToEnglish, convertNumberToPersian } from '../../../utils/helpers';
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
import apiInstance from '../../../utils/axiosConfig';
import { baseUrl } from '../../../utils/constants';
import StudentProfileModalCard from '../../StudentProfileModalCard';
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
      <div className="discount-page__header">
        <div className="discount-page-title__container">
          <h3 className="discount-page__title-text"> افزودن کد تخفیف.</h3>
        </div>
        <div>
          <button className="success-btn" style={{ marginLeft: 10 }}>
            اضافه کردن
          </button>
          <button className="danger-btn">انصراف</button>
        </div>
      </div>
      <div className="discount-page__second-row">
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

      <div>
        <label htmlFor="title" className="kp-text-input__label">
          تاریخ پایان اعتبار کد تخفیف:
        </label>
        <input
          type="text"
          placeholder="انتخاب تاریخ پایان اعتبار کد تخفیف"
          onBlur={() => setEndDateBlured(true)}
          onFocus={() => endDatePickerRef.current.openCalendar()}
          onClick={() => endDatePickerRef.current.openCalendar()}
          value={
            endDate && endDate.toString().length < 30
              ? convertNumberToPersian(`${endDate.toString()} ساعت ${endDate.hour}:${endDate.minute}`)
              : ''
          }
          onChange={e => setEndDate(e.target.value)}
          className="kp-text-input__input discount-page-input__end-date"
          id="title"
        />
        {endDateBlured && endDate == '' && (
          <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>زمان پایان تمرین نمیتواند خالی باشد.</div>
        )}
      </div>

      <div>
        <label htmlFor="title" className="kp-text-input__label">
          درصد تخفیف:
        </label>
        <input
          type="text"
          placeholder="درصد تخفیف"
          onBlur={() => setPercentageBlured(true)}
          value={percentage ? convertNumberToPersian(percentage) : ''}
          onChange={e => setPercentage(e.target.value)}
          className="kp-text-input__input discount-page-input__percentage"
          id="title"
        />
        {percentageBlured && percentage == '' && (
          <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>درصد تخفیف نمیتواند خالی باشد.</div>
        )}
      </div>

      <DatePicker
        ref={endDatePickerRef}
        inputClass="date-input"
        minDate={new Date()}
        value={endDate}
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
  );
}

export default CreateDiscount;
