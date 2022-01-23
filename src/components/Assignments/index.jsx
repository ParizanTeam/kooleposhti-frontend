import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import assignmentImg from '../../assets/images/assignment.png';
import { convertNumberToPersian } from '../../utils/helpers';
import { Modal, Fade, Backdrop } from '@mui/material';
import apiInstance from '../../utils/axiosConfig';
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';

import './style.scss';
import { toast, ToastContainer } from 'react-toastify';
import { Fragment } from 'react';
import { baseUrl } from '../../utils/constants';

const mockAssignments = [
  {
    id: 1,
    title: 'تمرین اول',
    startDate: { year: '1400', month: '08', day: '12', hour: '14', minute: '30' },
    endDate: { year: '1400', month: '08', day: '12', hour: '16', minute: '30' },
  },
  {
    id: 2,
    title: 'تمرین دوم',
    startDate: { year: '1400', month: '08', day: '12', hour: '14', minute: '30' },
    endDate: { year: '1400', month: '08', day: '12', hour: '16', minute: '30' },
  },
];

const Assignments = ({ role }) => {
  const history = useHistory();
  const params = useParams();
  const classId = params.classId;
  const [assignments, setAssignments] = useState(mockAssignments);
  const [openModal, setOpenModal] = useState(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [FMLoading, setFMLoading] = useState(true);

  const [modalConfirm, setModalConfirm] = useState(null);
  const [apiLoading, setapiLoading] = useState(false);
  useEffect(() => {
    setapiLoading(true);
    apiInstance.get(`${baseUrl}/courses/${classId}/assignments/`).then(res => {
      console.log(res.data);
      setAssignments(
        res.data.map(assignment => {
          const [startYear, startMonth, startDay] = assignment.start_date.split('-');
          const [endYear, endMonth, endDay] = assignment.end_date.split('-');
          const [startHour, startMinute] = assignment.start_time.split(':');
          const [endHour, endMinute] = assignment.end_time.split(':');

          return {
            id: assignment.id,
            title: assignment.title,
            startDate: { year: startYear, month: startMonth, day: startDay, hour: startHour, minute: startMinute },
            endDate: { year: endYear, month: endMonth, day: endDay, hour: endHour, minute: endMinute },
          };
        })
      );
      setapiLoading(false);
    });
  }, []);
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleFMClose = () => {
    setOpenFeedbackModal(false);
  };
  const handleFeedbackModal = (assignmentId, title) => {
    setFMLoading(true);
    setOpenFeedbackModal(true);
    apiInstance
      .get(`${baseUrl}/assignments/${assignmentId}/myfeedback/`)
      .then(res => {
        const fb = {
          title,
          ...res.data,
        };
        console.log('feedback', fb);
        setFeedback(fb);
        setFMLoading(false);
      })
      .catch(error => {
        setFeedback({
          title,
          error,
        });
        setFMLoading(false);
      });
  };
  return (
    <div className="assignments">
      <h3 style={{ marginBottom: 16 }}>لیست تمرین‌های کلاس</h3>

      {apiLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
        </div>
      )}
      {!apiLoading && (
        <>
          {role == 'teacher' && (
            <button
              className="assignments__create-btn"
              onClick={() => history.push(`/dashboard/class/${params.classId}/assignments/create`)}
            >
              ایجاد تمرین جدید
            </button>
          )}
          {assignments.length == 0 && (
            <div className="assignments__no-assignment">
              <img src={assignmentImg} alt="assignment" />
              <p>هنوز تمرینی برای این کلاس وجود ندارد.</p>
            </div>
          )}
          {assignments.length > 0 && (
            <div>
              {assignments.map(assignment => (
                <div className="assignment-card">
                  <div className="assignment-card__title">{assignment.title}</div>
                  <div className="assignment-card__body">
                    <div className="assignment-card__dates">
                      <div className="assignment-card__button-icon">
                        <EventNoteOutlinedIcon />
                        <span>شروع:</span>
                        <div className="assignment-card__start-date">
                          {convertNumberToPersian(
                            `${assignment.startDate.year}/${assignment.startDate.month}/${assignment.startDate.day} ساعت ${assignment.startDate.hour}:${assignment.startDate.minute}`
                          )}
                        </div>
                      </div>
                      <div className="assignment-card__button-icon">
                        <EventNoteOutlinedIcon />
                        <span>پایان:</span>
                        <div className="assignment-card__end-date">
                          {convertNumberToPersian(
                            `${assignment.endDate.year}/${assignment.endDate.month}/${assignment.endDate.day} ساعت ${assignment.endDate.hour}:${assignment.endDate.minute}`
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="assignment-card__buttons-wrapper">
                      <Link to={`assignments/view/${assignment.id}`} className="pink-btn">
                        مشاهده تمرین
                      </Link>

                      {role == 'student' && (
                        <button
                          onClick={() => {
                            setFeedback({ title: assignment.title });
                            handleFeedbackModal(assignment.id, assignment.title);
                          }}
                          className="info-btn"
                        >
                          بازخورد معلم
                        </button>
                      )}
                      {role == 'teacher' && (
                        <Fragment>
                          <Link className="info-btn" to={`assignments/${assignment.id}/edit`}>
                            ویرایش تمرین
                          </Link>
                          <Link to={`assignments/${assignment.id}/homeworks`} className="orange-btn">
                            مشاهده تکالیف
                          </Link>
                          <button
                            className="danger-btn"
                            onClick={() => {
                              setOpenModal(true);
                              setModalConfirm(() => {
                                return () => {
                                  apiInstance.delete(`${baseUrl}/assignments/${assignment.id}/`).then(res => {
                                    toast.success('تمرین با موفقیت حذف شد.');
                                    setAssignments(prev => prev.filter(item => item.id != assignment.id));
                                    setOpenModal(false);
                                  });
                                };
                              });
                            }}
                          >
                            حذف تمرین
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ToastContainer rtl={true} position="bottom-center" />
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
                <h4 className="register-modal__title">آیا از حذف این تمرین مطمئن هستید؟</h4>
                <button className="register-modal__confirm" onClick={handleClose}>
                  بازگشت
                </button>
                <button className="register-modal__cancel" onClick={modalConfirm}>
                  حذف
                </button>
              </div>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openFeedbackModal}
            onClose={handleFMClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openFeedbackModal}>
              <div className="register-modal">
                {feedback && (
                  <div dir="rtl">
                    <h3 className="register-modal__title">{feedback.title}</h3>
                    {FMLoading ? (
                      <div className="make-center">
                        <ReactLoading type="cylon" color="#255DAD" height={100} width={100} />
                      </div>
                    ) : (
                      <>
                        {!feedback.error ? (
                          <div style={{ textAlign: 'right' }}>
                            <h4>
                              <span> نمره: </span>
                              <span> {feedback.grade} </span>
                            </h4>
                            {feedback.description && (
                              <div style={{ paddingTop: '10px' }}>
                                <h4>توضیحات:</h4>
                                <span> {ReactHtmlParser(feedback.description)}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <h4>هنوز معلم بازخوردی ثبت نکرده.</h4>
                        )}
                      </>
                    )}
                  </div>
                )}
                <button className="register-modal__confirm" onClick={handleFMClose}>
                  بازگشت
                </button>
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Assignments;
