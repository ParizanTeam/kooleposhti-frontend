import React, { useState, useEffect } from 'react';
import SignupIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
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
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import profile_1 from '../../assets/images/profile_2.png';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../utils/axiosConfig';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import image from '../../assets/images/banner.png';

import './style.scss';
function DashboardTeacherClasses(props) {
  const [classData, setClassData] = useState([]);

  const token = 'JWT ' + localStorage.getItem('access_token');

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get('https://kooleposhti.herokuapp.com/accounts/instructors/classes/', {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('get response: ', response);
          setClassData(response.data);
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
      backgroundColor: 'rgba(10, 67, 94, 0.942)',
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

  function createData(img, subject, start_date, end_date, capacity, edit, classPage) {
    return { img, subject, start_date, end_date, capacity, edit, classPage };
  }

  const rows = [];
  classData.forEach(item => {
    rows.push(
      createData(
        'https://kooleposhti.herokuapp.com' + item.image,
        item.title,
        item.start_date,
        item.end_date,
        item.max_students,
        <Button
          component={Link}
          variant="contained"
          to={`/edit-course/${item.id}`}
          className="edit-icon"
          sx={{ ml: 1 }}
        >
          <Typography variant="body2" sx={{ color: 'white' }}>
            ویرایش
          </Typography>
        </Button>,
        <Button component={Link} variant="contained" to={`/courses/${item.id}`} className="enter-icon" sx={{ ml: 1 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            ورود به کلاس
          </Typography>
        </Button>
      )
    );
  });

  const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let breakpoint = useMediaQuery('(min-width: 1200px)');

  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <Helmet>
          <title>پروفایل</title>
        </Helmet>
        <ToastContainer />

        <Box component="form" noValidate sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(10, 67, 94, 0.942)',
                  width: { sm: '22.5vmin', xs: '140px' },
                  display: 'flex',
                  flexGrow: 1,
                }}
              >
                <Link to="/create-course">
                  <Typography variant="body" sx={{ color: '#fff' }}>
                    ایجاد کلاس جدید
                  </Typography>
                </Link>
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}></Grid>
          </Grid>
        </Box>

        <Grid sx={{ margin: '40px 10px 10px 0px' }} className="card-container">
          <ToastContainer rtl={true} />
          {/*  <TableContainer>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ fontSize: 14, backgroundColor: 'rgba(10, 67, 94, 0.942)', color: 'white' }}>
                    تصویر کلاس
                  </StyledTableCell>
                  <StyledTableCell align="left">عنوان کلاس</StyledTableCell>
                  <StyledTableCell align="left">تاریخ شروع کلاس</StyledTableCell>
                  <StyledTableCell align="left">تاریخ پایان کلاس</StyledTableCell>
                  <StyledTableCell align="left">ظرفیت کلاس</StyledTableCell>
                  <StyledTableCell align="left">ویرایش</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.subject}>
                    <StyledTableCell component="th" scope="row">
                      {row.img}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.subject}</StyledTableCell>
                    <StyledTableCell align="left">{row.start_date}</StyledTableCell>
                    <StyledTableCell align="left">{row.end_date}</StyledTableCell>
                    <StyledTableCell align="left">{row.capacity}</StyledTableCell>
                    <StyledTableCell align="left">{row.edit}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          <Grid container spacing={10}>
            {rows.map(row => (
              <Grid item md={breakpoint ? 4 : 6} sm={12} xs={12} className="grid">
                <Card sx={{ minWidth: '30vmin' }}>
                  <CardMedia component="img" height="194" image={image} alt="Paella dish" />
                  <CardContent className="card-item">
                    <Typography variant="h6" color="text.secondary">
                      {row.subject}
                    </Typography>
                  </CardContent>

                  <Divider sx={{ ml: 2.5, mr: 2.5 }} />
                  <CardContent className="card-item" sx={{ margin: '0 0 0 0 ' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                      ‌ظرفیت کلاس:
                    </Typography>

                    <Typography variant="body1">{row.capacity}</Typography>
                  </CardContent>

                  <Divider sx={{ ml: 2.5, mr: 2.5 }} />
                  <CardContent className="card-item" sx={{ margin: '0 0 0 0 ' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                      تاریخ شروع کلاس:
                    </Typography>

                    <Typography variant="body1" sx={{ margin: '0 0 0 0 ' }}>
                      {row.start_date}
                    </Typography>
                  </CardContent>
                  <Divider sx={{ ml: 2.5, mr: 2.5 }} />
                  <CardContent className="card-item" sx={{ margin: '0 0 0 0 ' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                      تاریخ پایان کلاس:
                    </Typography>

                    <Typography variant="body1">{row.end_date}</Typography>
                  </CardContent>
                  <Divider sx={{ ml: 2.5, mr: 2.5 }} />
                  <CardActions disableSpacing sx={{ margin: '20px 0 10px 0' }}>
                    {row.edit}
                    {row.classPage}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </CacheProvider>
  );
}

export default DashboardTeacherClasses;
