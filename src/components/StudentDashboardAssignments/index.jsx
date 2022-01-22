//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SleepingFox from '../../assets/images/SleepingFox.png';
import AwakenFox from '../../assets/images/AwakenFox.png';
import TimeToRest from '../../assets/images/TimeToRest.png';
//import PlayfulFox from '../../assets/images/PlayfulFox.png';
//import HappyFox from '../../assets/images/HappyFox.png'

import StudentDashboardHeader from '../StudentDashboardHeader';
import StudentDashboardFooter from '../StudentDashboardHeader/StudentDashboardFooter';
import './style.scss';
import { Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import ReactLoading from 'react-loading';

import ReactHtmlParser from 'react-html-parser';
import { changeDateFormat2 } from '../../utils/helpers';
import { useSelector} from 'react-redux';
import { change_profile_color } from '../../store/actions';
function MyAssignments() {
  const [loading, setLoading] = React.useState(true);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [assignments, setAssignments] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${baseUrl}/accounts/students/assignments/`)
      .then(res => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div  className="AcDiv">
      {loading || assignments.length <= 0? (
        <div style={{ padding: '140px', display: 'flex',alignItems:'center',justifyContent:'center' }}>
          <p className='NoAssign'>تمرین حل نشده نداری</p>
          <img src={TimeToRest} alt='TimeToRest' style={{width:'60px',marginRight:'10px'}}/>
        </div>
      ) : (
        <div>
          {assignments.map((assignment, idx) => (
            <Accordion expanded={idx == 0 ? true : expanded === idx} onChange={handleChange(idx)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon className="assignment-margin" />}>
                <img
                  src={idx == 0 || expanded === idx ? AwakenFox : SleepingFox}
                  alt="Fox"
                  className="FoxP assignment-margin"
                />
                <div className="Text">
                  <Typography sx={{ width: '33%', flexShrink: 0, margin: 1 }}>{assignment.title}</Typography>
                  <Typography sx={{ width: '33%',color: 'text.secondary', margin: 1, marginRight: 3 }}>
                    تا&nbsp;
                    {changeDateFormat2(assignment.end_date)} &nbsp; وقت داری
                  </Typography>

                  {!isMobile && (
                    <Typography sx={{ width: '33%', flexShrink: 0, margin: 1 }}>
                      درس: {assignment.course.title}
                      </Typography>
                  )} 
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="rangi assignment-margin">
                  {isMobile && (
                    <Typography align="right" sx={{ marginBottom: '10px' }}>
                      درس: {assignment.course.title}
                    </Typography>
                  )}
                  <Typography className="Mycolor" variant="h6" align="right" sx={{ marginBottom: '10px' }}>
                    صورت سوال:
                  </Typography>
                  <div className="assignment-question">{ReactHtmlParser(assignment.question)}</div>
                </div>
                <div className="BtRow">
                  <div className="firstBt">
                    <Button component={Link} to={`/dashboard/class/${assignment.course.id}/assignments`}>
                      <p className="Mycolor">همه تمرینهای این درس</p>
                    </Button>
                  </div>
                  <div className="SecBt">
                    <Button component={Link} to={`/dashboard/class/${assignment.course.id}/assignments/view/${assignment.id}`}>
                      <p className="Mycolor">بریم به صفحه این تمرین</p>
                    </Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}


const StudentDashboardAssignments = () => {
  const themeProps = useSelector(state => state.theme);
  let theNewone = localStorage.getItem("chosenColor");
  change_profile_color(theNewone);
  return (
  <div>
    <StudentDashboardHeader/>
    <img src={themeProps.btnLabel} alt='cc' className='ccImg'/>
    <br/>
    <div className="afterMyC-b">
      <MyAssignments />
    </div>
    <StudentDashboardFooter />
  </div>
  );
};
export default StudentDashboardAssignments;
