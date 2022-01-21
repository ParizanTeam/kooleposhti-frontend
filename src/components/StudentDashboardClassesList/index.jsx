//import { useMobile } from '../../utils/detectSource';
import StudentDashboardHeader from '../StudentDashboardHeader';
import React, { useEffect, useState } from 'react';
import StudentDashboardFooter from '../StudentDashboardHeader/StudentDashboardFooter';
import { useMobile } from '../../utils/detectSource';
import { coursesData } from '../CourseSlider/coursesData';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Select, MenuItem, Link } from '@mui/material';
import axios from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import { changeDateFormat, dateDiff } from '../../utils/helpers';
import ReactLoading from 'react-loading';
import './style.scss';
import CourseSlider from '../CourseSlider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { change_profile_color } from '../../store/actions';

const StudentDashboardClassesList = () => {
  const [loading, setLoading] = React.useState(true);
  const [classStatus, setClassStatus] = React.useState('active');
  const themeProps = useSelector(state => state.theme);
  let theNewone = localStorage.getItem('chosenColor');
  change_profile_color(theNewone);
  const customTheme = createTheme({
    palette: {
      primary: {
        main: themeProps.primaryColor,
      },
    },
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
  });
  const [classData, setClassData] = useState([]);
  const DisplayClass = date => {
    const isPast = dateDiff(date) >= -1 ? true : false;
    if (classStatus === 'active') return isPast;
    else if (classStatus === 'past') return !isPast;
    else return true;
  };
  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/accounts/students/classes/`)
        .then(response => {
          console.log('classData ', response.data.courses);
          setClassData(response.data.courses);
          setLoading(false);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
    fetchData();
  }, []);
  const handleChange = event => {
    setClassStatus(event.target.value);
  };
  return (
    <div>
      <StudentDashboardHeader />
      <ThemeProvider theme={customTheme}>
        <img src={themeProps.btnLabel} alt="cs" className="csImg" />
        <br />
        <div className="afterMyC-c studentdash ">
          <div style={{ marginRight: '100px' }}>
            <Select
              value={classStatus}
              onChange={handleChange}
              displayEmpty
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem value="active">کلاس‌های فعال</MenuItem>
              <MenuItem value="past">کلاس‌های گذشته</MenuItem>
              <MenuItem value="all">همه کلاس‌ها</MenuItem>
            </Select>
          </div>

          <div >
            {loading ? (
              <div style={{ padding: '100px'}} className='make-center'>
                <ReactLoading type="spinningBubbles" color={themeProps.primaryColor} height={100} width={100} />{' '}
              </div>
            ) : (
              <>
                {classData.length === 0 && (
                  <div>
                    <Typography variant="h6" component="div" className='make-center' style={{ padding: '50px 0', color: 'grey' }}>
                      کلاسی نداری چطوره یه نگاهی به کلاسای اینجا بندازی؟
                    </Typography>
                    <CourseSlider loadingColor={themeProps.primaryColor} />
                  </div>
                )}
                <Grid
                  className="studentdash"
                  style={{ display: 'flex' }}
                  justifyContent="center"
                  alignItems="center"
                  container
                  rowSpacing={4}
                  md={8}
                  xs={10}
                >
                  {classData.map(classInfo => (
                    <>
                      {DisplayClass(classInfo.end_date) && (
                        <Grid item md={4} sm={6} xs={12}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="180"
                              image={
                                classInfo.image
                                  ? `${baseUrl}${classInfo.image}`
                                  : 'https://www.inklyo.com/wp-content/uploads/How-to-Succeed-in-an-Online-Course.jpg'
                              }
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {classInfo.title}
                              </Typography>
                              <div className="studentdash__class-details">
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  align="right"
                                  style={{ lineHeight: '2' }}
                                >
                                  <span>مدرس</span> :{' '}
                                  <span>
                                    {classInfo.instructor.first_name} {classInfo.instructor.last_name}
                                  </span>
                                  <br />
                                  <span>از تاریخ</span> : <span>{changeDateFormat(classInfo.start_date)}</span>
                                  <br />
                                  <span>تا تاریخ</span> : <span>{changeDateFormat(classInfo.end_date)}</span>
                                  <br />
                                </Typography>
                              </div>
                            </CardContent>
                            <CardActions>
                              <a href={`/dashboard/class/${classInfo.id}`} target="_blank">
                                ورود به کلاس
                              </a>
                            </CardActions>
                          </Card>
                        </Grid>
                      )}
                    </>
                  ))}
                </Grid>
              </>
            )}
          </div>
        </div>
      </ThemeProvider>
      <StudentDashboardFooter />
    </div>
  );
};
export default StudentDashboardClassesList;
