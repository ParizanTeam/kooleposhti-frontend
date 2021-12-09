//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SleepingFox from '../../assets/images/SleepingFox.png';
import AwakenFox from '../../assets/images/AwakenFox.png';
//import PlayfulFox from '../../assets/images/PlayfulFox.png';
//import HappyFox from '../../assets/images/HappyFox.png'

import StudentDashboardHeader from '../StudentDashboardHeader';
import StudentDashboardFooter from '../StudentDashboardHeader/StudentDashboardFooter';
import './style.scss';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function MyAssignments(){
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //src={expanded?{SleepingFox}:{AwakenFox}}
  return (
    <div className='AcDiv'>
      <Accordion expanded={true} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <img src={AwakenFox} alt='Sleeping Fox'className='FoxP'/>
          <div className='Text'>
          <Typography sx={{ width: '33%', flexShrink: 0 ,margin: 1}}>
            چالش سخنرانی در جمع
          </Typography>
          <Typography sx={{ color: 'text.secondary', margin: 1, marginRight:3}}>فردا وقت تحویله!</Typography></div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='rangi'>
          <Typography>
            این چالش هفته پیش توسط استاد بخشنده ایجاد شده و فقط یک روز دیگه فرصت داری تا کاملش کنی
          </Typography></div>
          <div className='BtRow'>
          <div className='firstBt'>
          <Link to='/Student/CourseAssignmentsList'><Button>
            <p className='Mycolor'>همه تمرینهای این درس</p>
          </Button></Link></div>
          <div className='SecBt'><Link to='/Student/CourseAssignments'><Button>
          <p className='Mycolor'>بریم به صفحه این تمرین</p>
          </Button></Link></div>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <img src={(expanded === 'panel2')?AwakenFox:SleepingFox} alt='AwakenFox'className='FoxP'/>
          <div className='Text'>
          <Typography sx={{ width: '33%', flexShrink: 0,margin: 1 }}>چالش نقاشی دایناسور</Typography>
          <Typography sx={{ color: 'text.secondary',margin: 1, marginRight:3 }}>
            تا شنبه وقت داری!
          </Typography></div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='rangi'>
          <Typography>
          این چالش هفته پیش توسط استاد بخشنده ایجاد شده و دو روز دیگه فرصت داری تا کاملش کنی
          </Typography></div>
          <div className='BtRow'>
          <div className='firstBt'>
          <Link to='*'><Button>
            <p className='Mycolor'>همه تمرینهای این درس</p>
          </Button></Link></div>
          <div className='SecBt'><Link to='*'><Button>
          <p className='Mycolor'>بریم به صفحه این تمرین</p>
          </Button></Link></div>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <img src={(expanded === 'panel3')?AwakenFox:SleepingFox} alt='PlayfulFox'className='FoxP'/>
          <div className='Text'>
          <Typography sx={{ width: '33%', flexShrink: 0,margin: 1 }}>
            چالش شطرنج
          </Typography>
          <Typography sx={{ color: 'text.secondary' ,margin: 1, marginRight:3}}>
            دوشنبه آخرین فرصته...
          </Typography></div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='rangi'>
          <Typography> 
          این چالش سه روز پیش توسط استاد بخشنده ایجاد شده و چهار روز دیگه فرصت داری تا کاملش کنی
          </Typography></div>
          <div className='BtRow'>
          <div className='firstBt'>
          <Link to='*'><Button>
            <p className='Mycolor'>همه تمرینهای این درس</p>
          </Button></Link></div>
          <div className='SecBt'><Link to='*'><Button>
          <p className='Mycolor'>بریم به صفحه این تمرین</p>
          </Button></Link></div>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} > 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <img src={(expanded === 'panel4')?AwakenFox:SleepingFox} alt='HappyFox'className='FoxP'/>
          <div className='Text'>
          <Typography sx={{ width: '33%', flexShrink: 0 ,margin: 1}}>چالش نویسندگی خلاقانه</Typography>
          <Typography sx={{ color: 'text.secondary',margin: 1 , marginRight:3}}>
            تا پنجشنبه فقط وقت داری
          </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='rangi'>
          <Typography>
          این چالش دیروز توسط استاد بخشنده ایجاد شده و یک هفته دیگه فرصت داری تا کاملش کنی
          </Typography>
          </div>
          <div className='BtRow'>
          <div className='firstBt'>
          <Link to='*'><Button>
            <p className='Mycolor'>همه تمرینهای این درس</p>
          </Button></Link></div>
          <div className='SecBt'><Link to='*'><Button>
          <p className='Mycolor'>بریم به صفحه این تمرین</p>
          </Button></Link></div>
        </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


const StudentDashboardAssignments = () => {
  return (
  <div>
    <StudentDashboardHeader/>
    <img src='https://8pic.ir/uploads/1307925801537355428-128.png' alt='cc' className='ccImg'/>
    <br/>
    <div className="afterMyC-b">
      <MyAssignments />
    </div>
    <StudentDashboardFooter />
  </div>
  );
};
export default StudentDashboardAssignments;