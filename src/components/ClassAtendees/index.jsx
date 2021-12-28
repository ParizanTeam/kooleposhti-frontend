import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiInstance from '../../utils/axiosConfig';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { Box, Paper, Button, Avatar } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '../TablePagination';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../utils/constants';
import StudentProfileModalCard from '../StudentProfileModalCard';

function createData(id, image, firstname, lastname, username) {
  return {
    id,
    image,
    firstname,
    lastname,
    username,
  };
}

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
];
function Row(props) {
  console.log(props);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [showProfile, setShowProfile] = useState({ profileOpen: false, username: '' });

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        sx={{ '& > *': { borderBottom: 'unset' }, margin: '100px' }}
      >
        <TableCell align="right">
          <Avatar src={row.studentImage} alt="profile" sx={{ borderRadius: '50%' }} />
        </TableCell>
        <TableCell align="right">
          <p>{row.firstname}</p>
        </TableCell>
        <TableCell align="right">{row.lastname}</TableCell>

        <TableCell align="right" onClick={() => setOpen(!open)}>
          <Button
            onClick={() => {
              setShowProfile({ profileOpen: true, username: row.username });
              console.log({ showProfile });
            }}
          >
            مشاهده پروفایل
          </Button>
        </TableCell>
      </TableRow>

      <StudentProfileModalCard showProfile={showProfile} setShowProfile={setShowProfile} />
    </React.Fragment>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ClassAtendees = () => {
  const params = useParams();
  const classId = params.classId;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('firstname');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showProfile, setShowProfile] = useState({ profileOpen: false, username: '' });
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    apiInstance
      .get(`${baseUrl}/courses/${classId}/students/`)
      .then(res => {
        const rows = res.data.map(item =>
          createData(item.user_id, item.image, item.first_name, item.last_name, item.username)
        );
        setStudents(rows);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
    //*** finding role */
    // apiInstance.get(`https://kooleposhti.herokuapp.com/courses/${classId}/role/`).then(res => {
    //   console.log(res.data);
    // });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  return (
    <>
      <div>
        <h3 style={{ marginBottom: 16 }}>لیست شرکت‌کنندگان کلاس</h3>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
            <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
          </div>
        ) : (
          <>
            {students.length == 0 ? (
              <div> هنوز دانش‌آموزی در این کلاس ثبت‌نام نکرده‌است.</div>
            ) : (
              <Box sx={{ width: '100%', marginTop: '50px' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 750 }} size="medium">
                      <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
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
                            return <Row key={row.id} row={row} />;
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
};

export default ClassAtendees;
