//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pen from '../../assets/images/pen.png';

import './style.scss';
import { Link } from 'react-router-dom';

function BaseAssignmentsList(){
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <img src={Pen} alt='Sleeping Fox'className='Apic'/>
          <div className='txt'>
          <Typography sx={{ width: '33%', flexShrink: 0 ,margin: 1}}>
            تمرین 1
          </Typography>
          <Typography sx={{ color: '#292269', margin: 1}}>حل شده &#128516;</Typography>
          <div className='deadline'>
          <Typography sx={{ color: '#9e0089', margin: 1,marginInline:25}}>تا دوشنبه وقت داری!</Typography></div></div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='Clful'>
          <p> گربه ای در یک اتاق شش گوشه خوابیده است این گربه چند زاویه می بیند؟</p>
          <br/>
          <Link to="/Student/CourseAssignments">
          <div className='newCol'><p>بریم به صفحه تمرین</p></div></Link>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <img src={Pen} alt='AwakenFox'className='Apic'/>
          <div className='txt'>
          <Typography sx={{ width: '33%', flexShrink: 0,margin: 1 }}>تمرین 2</Typography>
          <Typography sx={{ color: '#292269',margin: 1 }}>
          حل نشده &#128542;
          </Typography>
          <div className='deadline'>
          <Typography sx={{ color: '#9e0089', margin: 1,marginInline:25}}>تا سه شنبه وقت داری!</Typography></div></div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='Clful'>
          <p> گربه ای در یک اتاق شش گوشه خوابیده است این گربه چند زاویه می بیند؟</p>
          <br/>
          <Link to="/Student/CourseAssignments">
          <div className='newCol'><p>بریم به صفحه تمرین</p></div></Link>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <img src={Pen} alt='PlayfulFox'className='Apic'/>
          <div className='txt'>
          <Typography sx={{ width: '33%', flexShrink: 0,margin: 1 }}>
          تمرین 3
          </Typography>
          <Typography sx={{ color: '#292269' ,margin: 1}}>
            حل شده &#128516;
          </Typography>
          <div className='deadline'>
          <Typography sx={{ color: '#9e0089', margin: 1,marginInline:25}}>تا پنجشنبه وقت داری!</Typography></div></div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='Clful'>
          <p> گربه ای در یک اتاق شش گوشه خوابیده است این گربه چند زاویه می بیند؟</p>
          <br/>
          <Link to="/Student/CourseAssignments">
          <div className='newCol'><p>بریم به صفحه تمرین</p></div></Link>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} > 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <img src={Pen} alt='HappyFox'className='Apic'/>
          <div className='txt'>
          <Typography sx={{ width: '33%', flexShrink: 0 ,margin: 1}}>تمرین 4</Typography>
          <Typography sx={{ color: '#292269',margin: 1 }}>
          حل نشده &#128542;
          </Typography>
          <div className='deadline'>
          <Typography sx={{ color: '#9e0089', margin: 1,marginInline:25}}>تا جمعه وقت داری!</Typography></div></div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='Clful'>
          <p> گربه ای در یک اتاق شش گوشه خوابیده است این گربه چند زاویه می بیند؟</p>
          <br/>
          <Link to="/Student/CourseAssignments">
          <div className='newCol'><p>بریم به صفحه تمرین</p></div></Link>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BaseAssignmentsList;