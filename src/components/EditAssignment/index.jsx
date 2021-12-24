// Import React dependencies.
import React, { useMemo, useState, useRef } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { toast } from 'react-toastify';
import { convertNumberToPersian, convertNumberToEnglish } from '../../utils/helpers';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ReactLoading from 'react-loading';

import 'react-multi-date-picker/styles/layouts/mobile.css';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './style.scss';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import apiInstance from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { useMediaQuery } from '@mui/material';

const customContentStateConverter = contentState => {
  // changes block type of images to 'atomic'
  const newBlockMap = contentState.getBlockMap().map(block => {
    const entityKey = block.getEntityAt(0);
    if (entityKey !== null) {
      const entityBlock = contentState.getEntity(entityKey);
      const entityType = entityBlock.getType();
      switch (entityType) {
        case 'IMAGE': {
          const newBlock = block.merge({
            type: 'atomic',
            text: 'img',
          });
          return newBlock;
        }
        default:
          return block;
      }
    }
    return block;
  });
  const newContentState = contentState.set('blockMap', newBlockMap);
  return newContentState;
};

const EditAssignment = ({ role }) => {
  const params = useParams();
  const assignmentId = params.assignmentId;
  const classId = params.classId;
  const [loadData, setLoadData] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  useEffect(() => {
    setLoadData(true);
    apiInstance.get(`${baseUrl}/assignments/${assignmentId}/`).then(res => {
      console.log(res.data);
      setTitle(res.data.title);
      const [startYear, startMonth, startDay] = res.data.start_date.split('-');
      const [endYear, endMonth, endDay] = res.data.end_date.split('-');
      const [startHour, startMinute] = res.data.start_time.split(':');
      const [endHour, endMinute] = res.data.end_time.split(':');
      setStartDate(
        new DateObject({
          date: `${startYear}/${startMonth}/${startDay} ${startHour}:${startMinute}`,
          format: 'YYYY/MM/DD HH:mm',
          calendar: persian,
          locale: persian_fa,
        })
      );
      setEndDate(
        new DateObject({
          date: `${endYear}/${endMonth}/${endDay} ${endHour}:${endMinute}`,
          format: 'YYYY/MM/DD HH:mm',
          calendar: persian,
          locale: persian_fa,
        })
      );
      const blocksFromHTML = convertFromHTML(res.data.question);
      const state = customContentStateConverter(
        ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      );
      setEditorContent(EditorState.createWithContent(state));
      setContent(draftToHtml(convertToRaw(EditorState.createWithContent(state).getCurrentContent())));
      setLoadData(false);
    });
  }, []);
  const location = useLocation();
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [title, setTitle] = useState(null);
  const [startDate, setStartDate] = useState();
  // new DateObject({
  //   date: `${assignment.startDate.year}/${assignment.startDate.month}/${assignment.startDate.day} ${assignment.startDate.hour}:${assignment.startDate.minute}`,
  //   format: 'YYYY/MM/DD HH:mm',
  //   calendar: persian,
  //   locale: persian_fa,
  // })
  const [endDate, setEndDate] = useState();
  // new DateObject({
  //   date: `${assignment.endDate.year}/${assignment.endDate.month}/${assignment.endDate.day} ${assignment.endDate.hour}:${assignment.endDate.minute}`,
  //   format: 'YYYY/MM/DD HH:mm',
  //   calendar: persian,
  //   locale: persian_fa,
  // })
  const [content, setContent] = useState('');
  const [editorContent, setEditorContent] = useState(null);
  const history = useHistory();
  const [titleBlured, setTitleBlured] = useState(false);
  const [contentBlured, setContentBlured] = useState(false);
  const [startDateBlured, setStartDateBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="create-assignment">
      <div className="create-assignment__header">
        <h3 className="create-assignment__title">ویرایش تمرین</h3>
        {!loadData && (
          <div style={{ display: isMobile ? 'unset' : 'flex', alignItems: 'center' }}>
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
                setContentBlured(true);
                if (!title || !startDate || !endDate || !content || content.trim() == '<p></p>') {
                  toast.error('لطفا فیلدهای مربوطه را به درستی وارد کنید.');
                } else {
                  setApiLoading(true);
                  const data = {
                    course: +classId,
                    title: title,
                    question: content,
                    start_date: convertNumberToEnglish(startDate.toString().split(' ')[0].split('/').join('-')),
                    start_time: `${startDate.hour}:${startDate.minute}`,
                    end_date: convertNumberToEnglish(endDate.toString().split(' ')[0].split('/').join('-')),
                    end_time: `${endDate.hour}:${endDate.minute}`,
                  };
                  console.log(data);
                  apiInstance.put(`${baseUrl}/assignments/${assignmentId}/`, data).then(res => {
                    toast.success('تمرین با موفقیت ,ویرایش شد.');
                    setTimeout(() => {
                      history.push(`/dashboard/class/${classId}/assignments/`);
                      setApiLoading(false);
                    }, 1000);
                  });
                }
              }}
            >
              ویرایش تمرین
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
        )}
      </div>
      {loadData && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
        </div>
      )}
      {!loadData && (
        <>
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
                    ? convertNumberToPersian(
                        `${startDate.toString().split(' ')[0]} ساعت ${startDate.hour}:${startDate.minute}`
                      )
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
          {contentBlured && (!content || content.trim() == '<p></p>') && (
            <div style={{ fontSize: 12, color: 'red', marginBottom: 8 }}>صورت تمرین نمی‌تواند خالی باشد.</div>
          )}
          <Editor
            wrapperClassName="rich-text-wrapper-class"
            editorClassName="rich-text-editor-class"
            toolbarClassName="rich-text-toolbar-class"
            editorState={editorContent}
            onEditorStateChange={content => {
              setEditorContent(content);
              setContent(draftToHtml(convertToRaw(content.getCurrentContent())));
            }}
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
          />{' '}
        </>
      )}
    </div>
  );
};

export default EditAssignment;
