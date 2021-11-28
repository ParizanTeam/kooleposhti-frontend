import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import assignmentImg from '../../assets/images/assignment.png';
import { convertNumberToPersian } from '../../utils/helpers';
import { Modal, Fade, Backdrop } from '@mui/material';

import './style.scss';
import { toast, ToastContainer } from 'react-toastify';
import { Fragment } from 'react';

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
  const [modalConfirm, setModalConfirm] = useState(null);
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div className="assignments">
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
                  <button
                    onClick={() => {
                      history.push(`/dashboard/class/${classId}/assignments/preview`);
                    }}
                    className="pink-btn"
                  >
                    مشاهده تمرین
                  </button>
                  {role == 'teacher' && (
                    <Fragment>
                      <button
                        className="info-btn"
                        onClick={() => {
                          history.push(`/dashboard/class/${classId}/assignments/edit`, {
                            assignment,
                          });
                        }}
                      >
                        ویرایش تمرین
                      </button>
                      <button
                        onClick={() => {
                          history.push(`/dashboard/class/${classId}/assignments/homeworks`);
                        }}
                        className="orange-btn"
                      >
                        مشاهده تکالیف
                      </button>
                      <button
                        className="danger-btn"
                        onClick={() => {
                          setOpenModal(true);
                          setModalConfirm(() => {
                            return () => {
                              toast.success('تمرین با موفقیت حذف شد.');
                              setAssignments(prev => prev.filter(item => item.id != assignment.id));
                              setOpenModal(false);
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
    </div>
  );
};

export default Assignments;
