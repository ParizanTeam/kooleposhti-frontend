//import { useMobile } from '../../utils/detectSource';
import MyClasses from '../MyClasses';
import React, { useEffect, useState } from 'react';
import MyClassesFooter from '../MyClasses/MyClassesFooter';
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

const ClassSchedule = () => {
  const [loading, setLoading] = React.useState(true);
  const [classStatus, setClassStatus] = React.useState('active');

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
      <MyClasses />
      <img src="https://8pic.ir/uploads/1307925801537355428-128.png" alt="cs" className="csImg" />
      <br />
      <div className="afterMyC-c">
        <div style={{ marginRight: '100px' }}>
          <Select value={classStatus} onChange={handleChange} displayEmpty MenuProps={{ disableScrollLock: true }}>
            <MenuItem value="active">کلاس های فعال</MenuItem>
            <MenuItem value="past">کلاس های گذشته</MenuItem>
            <MenuItem value="all">همه کلاس ها</MenuItem>
          </Select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginBottom: '30px' }}>
          {loading ? (
            <div style={{ padding: '100px',display: 'flex' }}>
              <ReactLoading type="spinningBubbles" color="orangered" height={100} width={100} />{' '}
            </div>
          ) : (
            <>
              {classData.length === 0 && (
                <div>
                  <Typography  variant="h6" component="div" style={{ padding: '50px 0', color: 'grey'}} >
                    کلاسی نداری چطوره یه نگاهی به کلاسای اینجا بندازی؟
                  </Typography>
                  <CourseSlider/>
                </div>
              )}
              <Grid style={{display: 'flex'}} justifyContent="center" alignItems="center" container rowSpacing={4} md={8} xs={10}>
                {classData.map(classInfo => (
                  <>
                    {DisplayClass(classInfo.end_date) && (
                      <Grid item md={4} sm={6} xs={12}>
                        <Card sx={{ maxWidth: 350, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={`${baseUrl}${classInfo.image}`}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {classInfo.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ lineHeight: '2',marginBottom:"-25px" }}>
                              مدرس: &nbsp;
                              {classInfo.instructor.last_name} {classInfo.instructor.first_name}
                              <br />
                              از تاریخ: &nbsp;
                              {changeDateFormat(classInfo.start_date)}
                              <br />
                              تا &nbsp;
                              {changeDateFormat(classInfo.end_date)}
                              <br />
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button variant="text" href={classInfo.link} target="_blank" sx={{ margin: '10px auto' }}>
                              ورود به کلاس
                            </Button>
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
      <MyClassesFooter />
    </div>
  );
};
export default ClassSchedule;
