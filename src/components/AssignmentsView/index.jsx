import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
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
import samplePDF from '../../assets/samples/Sample PDF.pdf';
import sampleVideo from '../../assets/samples/Sample Video.mp4';
import sampleImage from '../../assets/samples/Sample Image.jpg';

function createData(id, studentImage, firstname, lastname, status) {
  return {
    id,
    studentImage,
    firstname,
    lastname,
    status,
  };
}

const rows = StudentList.map(item => createData(item.id, item.imageSrc, item.firstName, item.lastName, item.status));

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
function Row(props) {
  console.log(props);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const isSelected = name => props.selected.indexOf(name) !== -1;
  const isItemSelected = isSelected(row.id);
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
  const [attachmentToView, setAttachmentToView] = React.useState(null);
  const attachmentFiles = [
    {
      id: 1,
      uploader: {
        username: `${row.firstname} ${row.lastname}`,
        userImage: row.studentImage,
      },
      name: 'Sample PDF.pdf',
      link: samplePDF,
      createdAt: convertNumberToPersian('شنبه 6 آذر 1400'),
      mimetype: 'application/pdf',
    },

    {
      id: 2,
      uploader: {
        username: `${row.firstname} ${row.lastname}`,
        userImage: row.studentImage,
      },
      name: 'Sample Video.mp4',
      link: sampleVideo,
      createdAt: convertNumberToPersian('شنبه 6 آذر 1400'),
      mimetype: 'video/mp4',
    },

    {
      id: 3,
      uploader: {
        username: `${row.firstname} ${row.lastname}`,
        userImage: row.studentImage,
      },
      name: 'Sample Image.jpg',
      link: sampleImage,
      createdAt: convertNumberToPersian('شنبه 6 آذر 1400'),
      mimetype: 'image/jpeg',
    },
    {
      id: 4,
      uploader: {
        username: `${row.firstname} ${row.lastname}`,
        userImage: row.studentImage,
      },
      name: 'Sample Document.docx',
      link: 'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.docx',
      createdAt: convertNumberToPersian('شنبه 6 آذر 1400'),
      mimetype: 'document/docx',
    },
  ];
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
          <Checkbox onClick={event => handleClick(event, row.id)} color="primary" checked={isItemSelected} />
        </TableCell>
        <TableCell align="right">
          <Avatar src={row.studentImage} alt="profile" sx={{ borderRadius: '50%' }} />
        </TableCell>
        <TableCell align="right">
          <p>{row.firstname}</p>
        </TableCell>
        <TableCell align="right">{row.lastname}</TableCell>
        <TableCell align="right">{row.status}</TableCell>

        <TableCell align="right" onClick={() => setOpen(!open)}>
          <Button>مشاهده تکلیف</Button>
          <IconButton size="small">{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, textAlign: 'right' }}>
              <Typography variant="h6" gutterBottom component="div">
                تکلیف ارسال شده:
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                پاسخ متنی
              </Typography>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <AttachFileIcon />
                  پیوست ها:
                </div>
                {attachmentToView ? (
                  <AttachmentViewer
                    attachment={attachmentToView}
                    // onDelete={}
                    onClose={() => setAttachmentToView(null)}
                  />
                ) : null}
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
                <div>
                  <Typography variant="body1" component="div" style={{ margin: '50px 0 20px' }}>
                    ثبت بازخورد:
                  </Typography>
                  {/* <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    sx={{ paddingTop: '10px', paddingBottom: '10px' }}
                  /> */}
                  <Editor
                    wrapperClassName="rich-text-wrapper-class"
                    editorClassName="rich-text-editor-class"
                    toolbarClassName="rich-text-toolbar-class"
                    // wrapperStyle={<wrapperStyleObject>}
                    // editorStyle={<editorStyleObject>}
                    // toolbarStyle={<toolbarStyleObject>}
                  />
                </div>
                <Box style={{ marginTop: '20px', marginRight: 'auto' }}>
                  <Button variant="outlined">ارسال</Button>
                </Box>
              </div>
            </Box>
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
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
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
              rowCount={rows.length}
              style={{ textAlign: 'right' }}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}