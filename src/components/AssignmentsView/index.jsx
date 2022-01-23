import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { StudentList } from './studentList';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse, Typography, IconButton, Button, TextField } from '@mui/material';
import { convertNumberToPersian } from '../../utils/helpers';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentViewer from '../AttachmentViewer';
import TablePagination from '../TablePagination';

import { useParams } from 'react-router-dom';
import { baseUrl } from '../../utils/constants';
import axios from '../../utils/axiosConfig';
import apiInstance from '../../utils/axiosConfig';
import ReactLoading from 'react-loading';
import './style.scss';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import { toast } from 'react-toastify';


import samplePDF from '../../assets/samples/Sample PDF.pdf';
import sampleVideo from '../../assets/samples/Sample Video.mp4';
import sampleImage from '../../assets/samples/Sample Image.jpg';
import { HomeWork } from '@mui/icons-material';

function createData(id, studentImage, firstname, lastname, username, status, answer, hwId) {
  return {
    id,
    studentImage,
    firstname,
    lastname,
    username,
    status,
    answer,
    hwId,
  };
}

// const rows = StudentList.map(item => createData(item.id, item.imageSrc, item.firstName, item.lastName, item.status));

const mime_types = {
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  docx: 'document',
  pdf: 'application',
  video: 'mp4',
};
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'firstname',
    label: 'نام',
    disablePadding: true,
  },
  {
    id: 'lastname',
    label: 'نام خانوادگی',
    disablePadding: true,
  },
  {
    id: 'status',
    label: 'وضعیت ارسال',
    disablePadding: true,
  },
];

const StudentHomeWork = ({ hw, assignmentId }) => {
  const answer = hw.answer;
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const feedbackPlaceHolder = '<p>بازخوردی ثبت نشده ...</p>';

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(feedbackPlaceHolder)))
  );
  const [hwMark, setHwMark] = React.useState('A');
  const [haveFB, setHaveFB] = React.useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/assignments/${assignmentId}/submit/${hw.hwId}/feedback/myfeedback/`)
      .then(res => {
        console.log('data', res.data);
        const description = res.data.description;
        const grade = res.data.grade;
        setHwMark(reverseMarks[grade]);
        setHaveFB(true);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(description))));
      })
      .catch(err => {
        console.log('error', err);
      });
  }, [hw, assignmentId]);
  const onContentStateChange = editorcontent => {
    setEditorContent(editorcontent);
  };

  const onEditorStateChange = editorstate => {
    setEditorState(editorstate);
  };

  const Marks = {
    A: 'عالی',
    B: 'خیلی خوب',
    C: 'خوب',
    D: 'نیاز به تلاش بیشتر',
  };

  const reverseMarks = {
    عالی: 'A',
    'خیلی خوب': 'B',
    خوب: 'C',
    'نیاز به تلاش بیشتر': 'D',
  };
  const handleMarkChange = event => {
    const val = event.target.value;
    setHwMark(val);
  };

  const submitFeedback = () => {
    console.log('mark', Marks[hwMark]);
    const mark = Marks[hwMark];
    let feedback = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    // not working
    if (feedback === feedbackPlaceHolder) feedback = null;
    const body = {
      grade: mark,
      description: feedback,
    };
    axios
      .post(`${baseUrl}/assignments/${assignmentId}/submit/${hw.hwId}/feedback/myfeedback/`, body)
      .then(res => {
        console.log(res.data);
        toast.success('بازخورد شما با موفقیت ثبت شد.');

      })
      .catch(err => {
        console.log('error', err);
        toast.error('مشکلی در سامانه به وجود آمده‌است.');

      });
  };
  const [attachmentToView, setAttachmentToView] = React.useState(null);
  const convertDateToJalali = input => {
    const JDate = require('jalali-date');
    const date = new Date(input);
    const jdate = new JDate(date).format('dddd DD MMMM YYYY');
    return jdate;
  };

  const attachmentFiles = [];
  if (answer && answer.file) {
    // console.log('answer', answer);
    let name = hw.username;
    if (hw.firstname) {
      name = hw.firstname;
      if (hw.lastname) name = `${hw.firstname} ${hw.lastname}`;
    }
    const filename = decodeURI(answer.file.split('/').at(-1));
    const file_adrr = `https://kooleposhti.ml${answer.file}`;
    const file_format = filename.split('.').at(-1);
    const mime_type = `${mime_types[file_format]}/${file_format}`;
    const submited_date=convertDateToJalali(answer.submited_date);
    attachmentFiles.push({
      id: 1,
      uploader: {
        username: name,
        userImage: hw.studentImage ? `https://kooleposhti.ml${hw.studentImage}` : null,
      },
      name: filename,
      link: file_adrr,
      createdAt: convertNumberToPersian(submited_date),
      mimetype: mime_type,
    });
  }
  return (
    <Box className="studentHW" sx={{ margin: 1, textAlign: 'right' }}>
      <h3 style={{ marginBottom: '10px' }}>پاسخ ثبت شده: </h3>
      <Typography variant="p" gutterBottom component="div">
        {answer && ReactHtmlParser(answer.answer)}
      </Typography>
      <div>
        <div className="attachments">
          <h4>
            <AttachFileIcon />
            پیوست ها:
          </h4>
        </div>

        {attachmentToView ? (
          <AttachmentViewer
            attachment={attachmentToView}
            // onDelete={}
            onClose={() => setAttachmentToView(null)}
          />
        ) : null}
        {attachmentFiles.length == 0 && (
          <Typography style={{ color: 'grey', marginTop: '5px' }} variant="subtitle1">
            هیچی پیوست نشده است
          </Typography>
        )}
        {attachmentFiles.map(attachment => (
          <div>
            <Button
              style={{ textTransform: 'none' }}
              key={attachment.id}
              onClick={() => setAttachmentToView(attachment)}
            >
              {attachment.name}
            </Button>
          </div>
        ))}
      </div>
      <div>
        <div className="assignment-feedback">
          <div className="title">
            <h3>ثبت بازخورد</h3>
          </div>
          <Editor
            defaultEditorState={editorState}
            editorState={editorState}
            editorContent={editorContent}
            wrapperClassName="editor-wrapper feedback-editor"
            editorClassName="editor-main"
            onContentStateChange={onContentStateChange}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
          <div className="mark">
            <h4> نمره: </h4>
            <div className="marks-menu">
              <Select
                value={hwMark}
                placeholder="A"
                onChange={handleMarkChange}
                displayEmpty
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                {Object.entries(Marks).map(([key, val], i) => (
                  <MenuItem key={i} value={key}>
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <Box className="submit-btn">
              <Button onClick={submitFeedback} variant="outlined">
                {
                  haveFB?'ثبت تغییرات' : 'ثبت'
                }
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
};
function Row(props) {
  const { row } = props;
  const params = useParams();
  const assignmentId = params.assignmentId;
  const [open, setOpen] = React.useState(false);
  const isSelected = name => props.selected.indexOf(name) !== -1;
  const isItemSelected = isSelected(row.id);
  const submited = 'تحویل داده شده';
  const unsubmited = 'تحویل داده نشده';

  const handleClick = (event, name) => {
    const selectedIndex = props.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selected.slice(0, props.selectedIndex),
        props.selected.slice(selectedIndex + 1)
      );
    }

    props.setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{ '& > *': { borderBottom: 'unset' }, margin: '100px' }}
      >
        <TableCell padding="checkbox">
          {/* <Checkbox onClick={event => handleClick(event, row.id)} color="primary" checked={isItemSelected} /> */}
        </TableCell>
        <TableCell align="right">
          <Avatar
            src={row.studentImage ? `https://kooleposhti.ml${row.studentImage}` : null}
            alt="profile"
            sx={{ borderRadius: '50%' }}
          />
        </TableCell>
        <TableCell align="right">
          <p>{row.firstname}</p>
        </TableCell>
        <TableCell align="right">{row.lastname}</TableCell>
        <TableCell align="right">{row.status ? submited : unsubmited} </TableCell>

        <TableCell align="right">
          <Button onClick={() => setOpen(!open)} disabled={!row.status}>
            مشاهده تکلیف
            <IconButton size="small">{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StudentHomeWork hw={row} assignmentId={assignmentId} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          /> */}
        </TableCell>
        <TableCell align="right" padding="checkbox"></TableCell>
        {headCells.map(headCell => (
          <TableCell
            padding={headCell.disablePadding ? 'none' : 'normal'}
            align="right"
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ textAlign: 'right' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right"></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AssignmentsView() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('firstname');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const params = useParams();
  const classId = params.classId;
  const assignmentId = params.assignmentId;

  const [students, setStudents] = useState([]);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    apiInstance
      .get(`${baseUrl}/assignments/${assignmentId}/submit/`)
      .then(res => {
        const temp = {};
        res.data.forEach(a => {
          temp[a.student] = a;
        });
        console.log('SubmitAssignments', temp);

        apiInstance
          .get(`${baseUrl}/courses/${classId}/students/`)
          .then(res => {
            console.log('students', res.data);

            const rows = res.data.map(item =>
              createData(
                item.user_id,
                item.image ? item.image.image : null,
                item.first_name,
                item.last_name,
                item.username,
                item.id in temp,
                temp[item.id],
                temp[item.id]?temp[item.id].id:null
              )
            );
            console.log('assignments', res.data);
            setStudents(rows);
            setLoading(false);
          })
          .catch(err => {
            console.log('error: ', err);
          });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = students.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  return (
    <>
      <div>
        <h3 style={{ marginBottom: 16 }}>لیست تکالیف دانش آموزان</h3>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
            <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
          </div>
        ) : (
          <>
            {students.length == 0 ? (
              <div> هنوز دانش‌آموزی در این کلاس ثبت‌نام نکرده‌است.</div>
            ) : (
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 750 }} size="medium">
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={students.length}
                        style={{ textAlign: 'right' }}
                      />
                      <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                     rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(students, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            return <Row key={row.id} row={row} selected={selected} setSelected={setSelected} />;
                          })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: 53 * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    count={students.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            )}
          </>
        )}
      </div>
    </>
  );
}
