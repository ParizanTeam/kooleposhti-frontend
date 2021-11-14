//import { useMobile } from '../../utils/detectSource';
import MyClasses from '../MyClasses';
import React from 'react';
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
import { Select, MenuItem } from '@mui/material';

import './style.scss';

const ClassCard = () => {
  return (
    <Card sx={{ maxWidth: 300, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="140"
        image="https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=fit:crop,height:283,width:472/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/bCpGofJTliqN6MltJhvQ"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          آموزش شطرنج
        </Typography>
        <Typography variant="body2" color="text.secondary">
          مدرس: حانیه جعفری
          <br />
          روز های: دوشنبه سه شنبه ها
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ margin: 'auto' }}>ورود به کلاس</Button>
      </CardActions>
    </Card>
  );
};
const ClassSchedule = () => {
  const [showClass, setShowClass] = React.useState('');

  const handleChange = event => {
    setShowClass(event.target.value);
  };
  return (
    <div>
      <MyClasses />
      <br />
      <div className="afterMyC-c">
        <div style={{marginRight:"100px"}}> 
          <Select value={showClass} onChange={handleChange} displayEmpty  disableScrollLock={true} >
            <MenuItem value="">کلاس های فعال</MenuItem>
            <MenuItem value="pastClasses">کلاس های گذشته</MenuItem>
          </Select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center',textAlign:'center' }}>
          <Grid justifyContent="center" alignItems="center" container rowSpacing={4} md={5} xs={6}>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCard />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCard />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCard />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCard />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCard />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCard />
            </Grid>
          </Grid>
        </div>
      </div>

      <MyClassesFooter />
    </div>
  );
};
export default ClassSchedule;
