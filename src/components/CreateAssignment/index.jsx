// Import React dependencies.
import React, { useMemo, useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ToastContainer, toast } from 'react-toastify';
import { convertNumberToEnglish, convertNumberToPersian } from '../../utils/helpers';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import apiInstance from '../../utils/axiosConfig';
import ReactLoading from 'react-loading';

import 'react-multi-date-picker/styles/layouts/mobile.css';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './style.scss';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { baseUrl } from '../../utils/constants';
import draftToHtml from 'draftjs-to-html';
import { useMediaQuery } from '@mui/material';

const CreateAssignment = ({ role }) => {
  const editor = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [content, setContent] = useState('');
  const history = useHistory();
  const params = useParams();
  const classId = params.classId;
  const [titleBlured, setTitleBlured] = useState(false);
  const [startDateBlured, setStartDateBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);
  const [editorContent, setEditorContent] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="create-assignment">
      <div className="create-assignment__header">
        <h3 className="create-assignment__title">ساختن تمرین جدید</h3>
        <div style={{ display: useMediaQuery('(max-width: 768px)') ? 'unset' : 'flex', alignItems: 'center' }}>
          {apiLoading && !isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginLeft: 16 }}>
              <ReactLoading type="bars" color="#000" height={50} width={50} />
            </div>
          )}
          <button
            className="success-btn"
            onClick={() => {
              setTitleBlured(true);
              setStartDateBlured(true);
              setEndDateBlured(true);
              if (!title || !startDate || !endDate) {
                toast.error('لطفا فیلدهای مربوطه را به درستی وارد کنید.');
              } else {
                setApiLoading(true);
                const data = {
                  course: +classId,
                  title: title,
                  question: content,
                  start_date: convertNumberToEnglish(startDate.toString().split('/').join('-')),
                  start_time: `${startDate.hour}:${startDate.minute}`,
                  end_date: convertNumberToEnglish(endDate.toString().split('/').join('-')),
                  end_time: `${endDate.hour}:${endDate.minute}`,
                };
                console.log(data);
                apiInstance.post(`${baseUrl}/assignments/`, data).then(res => {
                  toast.success('تمرین با موفقیت اضافه شد.');
                  setTimeout(() => {
                    history.push(`/dashboard/class/${classId}/assignments/`);
                    setApiLoading(false);
                  }, 1000);
                });
              }
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
          {apiLoading && isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 8 }}>
              <ReactLoading type="bars" color="#000" height={50} width={50} />
            </div>
          )}
        </div>
      </div>
      <div className="kp-text-input create-assignment__title-input">
        <label className="kp-text-input__label" htmlFor="title">
          عنوان تمرین:
        </label>
        <input
          onBlur={() => setTitleBlured(true)}
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="kp-text-input__input"
          placeholder="عنوان تمرین"
          type="text"
          id="title"
        />
        {titleBlured && title == '' && (
          <div style={{ fontSize: 12, color: 'red' }}>عنوان تمرین نمی‌تواند خالی باشد.</div>
        )}
      </div>
      <div className="create-assignment__dates-wrapper">
        <div className="kp-text-input create-assignment__start-date">
          <label className="kp-text-input__label" htmlFor="start-date">
            زمان شروع:
          </label>
          <input
            autoComplete="off"
            onBlur={() => setStartDateBlured(true)}
            onFocus={() => startDatePickerRef.current.openCalendar()}
            onClick={() => startDatePickerRef.current.openCalendar()}
            className="kp-text-input__input"
            placeholder="انتخاب زمان شروع"
            type="text"
            id="start-date"
            value={
              startDate
                ? convertNumberToPersian(`${startDate.toString()} ساعت ${startDate.hour}:${startDate.minute}`)
                : ''
            }
          />
          {startDateBlured && !startDate && (
            <div style={{ fontSize: 12, color: 'red' }}>زمان شروع نمی‌تواند خالی باشد.</div>
          )}
        </div>
        <div className="kp-text-input create-assignment__end-date">
          <label className="kp-text-input__label" htmlFor="end-date">
            زمان پایان:
          </label>
          <input
            autoComplete="off"
            onBlur={() => setEndDateBlured(true)}
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
          {endDateBlured && !endDate && (
            <div style={{ fontSize: 12, color: 'red' }}>زمان پایان نمی‌تواند خالی باشد.</div>
          )}
        </div>
      </div>
      <label className="kp-text-input__label">متن صورت تمرین:</label>
      {/* <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={newContent => setContent(newContent)}
      /> */}
      <Editor
        wrapperClassName="rich-text-wrapper-class"
        editorClassName="rich-text-editor-class"
        toolbarClassName="rich-text-toolbar-class"
        editorState={editorContent}
        onEditorStateChange={content => {
          setEditorContent(content);
          setContent(draftToHtml(convertToRaw(content.getCurrentContent())));
        }}

        // wrapperStyle={<wrapperStyleObject>}
        // editorStyle={<editorStyleObject>}
        // toolbarStyle={<toolbarStyleObject>}
      />
      <DatePicker
        ref={startDatePickerRef}
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

export default CreateAssignment;
