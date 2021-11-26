// Import React dependencies.
import React, { useMemo, useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ToastContainer, toast } from 'react-toastify';
import { convertNumberToPersian } from '../../utils/helpers';

import 'react-multi-date-picker/styles/layouts/mobile.css';

import './style.scss';
import { useHistory, useLocation } from 'react-router-dom';

const EditAssignment = () => {
  const location = useLocation();
  const assignment = location.state.assignment;
  console.log(assignment.title);
  const editor = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [title, setTitle] = useState(assignment.title);
  const [startDate, setStartDate] = useState(
    new DateObject({
      date: `${assignment.startDate.year}/${assignment.startDate.month}/${assignment.startDate.day} ${assignment.startDate.hour}:${assignment.startDate.minute}`,
      format: 'YYYY/MM/DD HH:mm',
      calendar: persian,
      locale: persian_fa,
    })
  );
  const [endDate, setEndDate] = useState(
    new DateObject({
      date: `${assignment.endDate.year}/${assignment.endDate.month}/${assignment.endDate.day} ${assignment.endDate.hour}:${assignment.endDate.minute}`,
      format: 'YYYY/MM/DD HH:mm',
      calendar: persian,
      locale: persian_fa,
    })
  );
  const [content, setContent] = useState('');
  const history = useHistory();

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    placeholder: 'متن صورت تمرین...',
    minHeight: 400,
    statusbar: false,
  };

  return (
    <div className="create-assignment">
      <div className="create-assignment__header">
        <h3 className="create-assignment__title">ساختن تمرین جدید</h3>
        <div>
          <button
            className="success-btn"
            onClick={() => {
              toast.success('تمرین با موفقیت اضافه شد.');
              setTimeout(() => {
                history.goBack();
              }, 1000);
            }}
          >
            افزودن تمرین
          </button>
          <button
            className="danger-btn"
            onClick={() => {
              history.goBack();
            }}
          >
            انصراف
          </button>
        </div>
      </div>
      <div className="kp-text-input create-assignment__title-input">
        <label className="kp-text-input__label" htmlFor="title">
          عنوان تمرین:
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="kp-text-input__input"
          placeholder="عنوان تمرین"
          type="text"
          id="title"
        />
      </div>
      <div className="create-assignment__dates-wrapper">
        <div className="kp-text-input create-assignment__start-date">
          <label className="kp-text-input__label" htmlFor="start-date">
            زمان شروع:
          </label>
          <input
            onFocus={() => startDatePickerRef.current.openCalendar()}
            onClick={() => startDatePickerRef.current.openCalendar()}
            className="kp-text-input__input"
            placeholder="انتخاب زمان شروع"
            type="text"
            id="start-date"
            value={
              startDate
                ? convertNumberToPersian(
                    `${startDate.toString().split(' ')[0]} ساعت ${startDate.hour}:${startDate.minute}`
                  )
                : ''
            }
          />
        </div>
        <div className="kp-text-input create-assignment__end-date">
          <label className="kp-text-input__label" htmlFor="end-date">
            زمان پایان:
          </label>
          <input
            onFocus={() => endDatePickerRef.current.openCalendar()}
            onClick={() => endDatePickerRef.current.openCalendar()}
            className="kp-text-input__input"
            placeholder="انتخاب زمان پایان"
            type="text"
            id="end-date"
            value={
              endDate ? convertNumberToPersian(`${endDate.toString()} ساعت ${endDate.hour}:${endDate.minute}`) : ''
            }
          />
        </div>
      </div>
      <label className="kp-text-input__label">متن صورت تمرین:</label>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={newContent => setContent(newContent)}
      />
      <DatePicker
        ref={startDatePickerRef}
        currentDate={startDate}
        inputClass="date-input"
        className="rmdp-mobile"
        onChange={date => {
          setStartDate(date);
        }}
        calendar={persian}
        locale={persian_fa}
        plugins={[<TimePicker hideSeconds position="bottom" />]}
      />
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
    </div>
  );
};

export default EditAssignment;