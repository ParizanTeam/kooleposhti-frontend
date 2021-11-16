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

const ClassCarda = () => {
  return (
    <Card sx={{ maxWidth: 350, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="180"
        image='https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=fit:crop,height:283,width:472/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/TcAWV8mZShCS36mN0Uei'
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        آشنایی با معماری
        </Typography>
        <Typography variant="body2" color="text.secondary">
          مدرس: افشین زنگنه
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


const ClassCardd = () => {
  return (
    <Card sx={{ maxWidth: 350, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="180"
        image="https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=fit:crop,height:283,width:472/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/dAqePyb4R5CQN1FfEHcZ"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        تندخوانی 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          مدرس: غزل بخشنده 
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

const ClassCarde = () => {
  return (
    <Card sx={{ maxWidth: 350, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="180"
        image="https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=fit:crop,height:283,width:472/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/KeX9jdVyT8CHvIW3xX46"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        آموزش گیتار برای کودکان
        </Typography>
        <Typography variant="body2" color="text.secondary">
          مدرس: دانیال بازمانده 
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

const ClassCardf= () => {
  return (
    <Card sx={{ maxWidth: 350, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="180"
        image="https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=fit:crop,height:283,width:472/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/nNTBArS9S2i2PMEEWJOf"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        نویسندگی خلاقانه' 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          مدرس: بیان دیوانی آذر 
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


const ClassCardb = () => {
  return (
    <Card sx={{ maxWidth: 350, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="180"
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

const ClassCardc = () => {
  return (
    <Card sx={{ maxWidth: 350, boxShadow: '8px 8px 6px #888888', m: '20px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="180"
        image="https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=fit:crop,height:283,width:472/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/7MNa1W9jSyKYoKW5MMUl"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        سخنرانی در جمع
        </Typography>
        <Typography variant="body2" color="text.secondary">
          مدرس: علی صداقی
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
          <Select value={showClass} onChange={handleChange} displayEmpty  MenuProps={{ disableScrollLock: true }} >
            <MenuItem value="">کلاس های فعال</MenuItem>
            <MenuItem value="pastClasses">کلاس های گذشته</MenuItem>
          </Select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center',textAlign:'center',marginBottom: "30px" }}>
          <Grid justifyContent="center" alignItems="center" container rowSpacing={4} md={8} xs={10}>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCarda />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCardb />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCardc />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCardd />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCarde />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ClassCardf />
            </Grid>
          </Grid>
        </div>
      </div>

      <MyClassesFooter />
    </div>
  );
};
export default ClassSchedule;
