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
import { useHistory } from 'react-router-dom';
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
  const [code, setCode] = useState('');
  const params = useParams();
  const [saveDate, setSaveDate] = useState(new Date());
  const history = useHistory();
  const endDatePickerRef = useRef(null);
  const classId = params.classId;
  const [buttonLoading, setButtonLoading] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

  const token = 'JWT ' + localStorage.getItem('access_token');
  const courseId = params.classId;

  const handleClose = () => {
    setOpenModal(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  let regex = /[^A-Za-z0-9]+/;

  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  function handleChangeTitle(e) {
    setTitle(e.target.value);
    setCode(e.target.value);
  }

  return (
    <>
      <div className="discount-page__header">
        <div className="discount-page-title__container">
          <h3 className="discount-page__title-text"> افزودن کد تخفیف.</h3>
        </div>
        <div>
          <button
            className="success-btn"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setTitleBlured(true);
              setEndDateBlured(true);
              setPercentageBlured(true);
              console.log('hello');
              if (
                !endDate ||
                !percentage ||
                (title && !regex.test(title)) ||
                convertNumberToEnglish(percentage) > 100 ||
                convertNumberToEnglish(percentage) < 0
              ) {
                toast.error('لطفا فیلدهای مربوطه را درست وارد کنید.');
                console.log('this is error.');
              } else {
                const data = {
                  title: title,
                  expiration_date: saveDate,
                  discount: percentage,
                  code: code,
                  course: courseId,
                };
                console.log(data);
                apiInstance.post(`${baseUrl}/discounts/`, data).then(res => {
                  toast.success('کد تخفیف با موفقیت اضافه شد.');
                  setTimeout(() => {
                    history.push(`${baseUrl}/dashboard/class/${classId}/discounts`);
                  }, 1000);
                });
                console.log(saveDate);
                console.log('hello\n');
              }
            }}
          >
            {!buttonLoading && <span>اضافه کردن</span>}
            {buttonLoading && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
          </button>
          <button
            className="danger-btn"
            onClick={() => {
              history.goBack();
            }}
          >
            {!buttonLoading && <span>انصراف</span>}
            {buttonLoading && <ReactLoading type="bubbles" color="#fff" className="loading-signup" />}
          </button>
        </div>
      </div>
      <div className="discount-page__second-row">
        <label htmlFor="title" className="kp-text-input__label">
          متن کد تخفیف:
        </label>
        <p style={{ marginBottom: 10 }}>
          در صورتی که متنی وارد نکنید، به طور خودکار متنی برای کد تخفیف تولید خواهد شد.
        </p>
        <input
          type="text"
          placeholder="متن کد تخفیف"
          onBlur={() => setTitleBlured(true)}
          value={title}
          onChange={e => handleChangeTitle(e)}
          className="kp-text-input__input discount-page-input__title"
          id="title"
        />
        {regex.test(title) && (
          <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>
            متن کد تخفیف باید تنها از اعداد و الفبای انگلیسی تشکیل شده باشد.
          </div>
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
        {(convertNumberToEnglish(percentage) > 100 || convertNumberToEnglish(percentage) < 0) && (
          <div style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>درصد تخفیف باید عددی بین 0 تا 100 باشد</div>
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
          console.log(date);
          setSaveDate(new Date(date.toUTC()).toISOString());
          console.log('to string');
          console.log(date);
          //console.log(date.format.toUTC());
          console.log(saveDate);
          console.log('save data to string');
          console.log(saveDate);
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
