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
import { baseUrl } from '../../utils/constants';
import ReactLoading from 'react-loading';
import image from '../../assets/images/banner.png';
import { convertNumberToPersian } from '../../utils/helpers';

import './style.scss';
function DashboardTeacherClasses(props) {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = 'JWT ' + localStorage.getItem('access_token');

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/accounts/instructors/classes/`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('get response: ', response);
          setClassData(response.data);
          setLoading(false);
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
        item.image === null ? image : `${baseUrl}` + item.image,
        item.title,
        convertNumberToPersian(item.start_date),
        convertNumberToPersian(item.end_date),
        convertNumberToPersian(item.max_students),
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
        <Button
          component={Link}
          variant="contained"
          to={`/dashboard/class/${item.id}`}
          className="enter-icon"
          sx={{ ml: 1 }}
        >
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

  let breakpoint = useMediaQuery('(min-width: 1000px)');

  return (
    <CacheProvider value={cacheRtl}>
      {loading && (
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <ReactLoading type="spinningBubbles" color="rgb(42, 105, 129)" height={100} width={100} />
          </Grid>
        </Grid>
      )}
      {!loading && (
        <div dir="rtl">
          <Helmet>
            <title>پروفایل</title>
          </Helmet>
          <ToastContainer />

          <Box component="form" noValidate sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgba(10, 67, 94, 0.942)',
                    width: { sm: '22vmin', xs: '140px' },
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: rows.length === 0 ? "center" : "initial",
                    justifyContent:"center",
                    margin: rows.length === 0 ? "auto" : "initial",
                    minHeight:"50px",
                  }}
                >
                  <Link to="/create-course" >
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
            <Grid
              container
              spacing={3}
              sx={{
                margin: { xl: '0 13vmin', lg: 'auto', md: breakpoint ? '0vmin' : '0 7vmin', sm: '0 4vmin', xs: '0' },
                paddingRight: '1.5vmin',
              }}
            >
              {rows.length === 0 && <p className='teacher-classes-emptylist'>کلاسی برای نمایش وجود نداره !!!</p>}
              {rows.map(row => (
                <Grid item lg={4} md={breakpoint ? 6 : 12} sm={12} xs={12}>
                  <Card sx={{ minWidth: '30vmin', borderRadius: '25px' }} className="grid">
                    <CardMedia
                      component="img"
                      height="194"
                      image={row.img}
                      alt="Paella dish"
                      className="card-media-image"
                    />
                    <CardContent className="card-item">
                      <Typography variant="h6" color="text.secondary" className="course-title">
                        {row.subject}
                      </Typography>
                    </CardContent>

                    {/* <Divider sx={{ ml: 2.5, mr: 2.5 }} /> */}
                    <CardContent className="card-item" sx={{ margin: '0 0 0 0 ' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                        ‌ظرفیت کلاس:
                      </Typography>

                      <Typography variant="body1">{row.capacity}</Typography>
                    </CardContent>

                    {/*  <Divider sx={{ ml: 2.5, mr: 2.5 }} /> */}
                    <CardContent className="card-item" sx={{ margin: '0 0 0 0 ' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                        تاریخ شروع کلاس:
                      </Typography>

                      <Typography variant="body1" sx={{ margin: '0 0 0 0 ' }}>
                        {row.start_date}
                      </Typography>
                    </CardContent>
                    {/*  <Divider sx={{ ml: 2.5, mr: 2.5 }} /> */}
                    <CardContent className="card-item" sx={{ margin: '0 0 0 0 ' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                        تاریخ پایان کلاس:
                      </Typography>

                      <Typography variant="body1">{row.end_date}</Typography>
                    </CardContent>
                    {/* <Divider sx={{ ml: 2.5, mr: 2.5 }} /> */}
                    <CardActions
                      disableSpacing
                      sx={{ margin: '20px 0 10px 0', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
                    >
                      {row.edit}
                      {row.classPage}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      )}
    </CacheProvider>
  );
}

export default DashboardTeacherClasses;
