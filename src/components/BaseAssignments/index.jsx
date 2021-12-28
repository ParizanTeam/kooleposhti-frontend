//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import axios from '../../utils/axiosConfig';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Pen from '../../assets/images/pen.png';
import Uploader from '../Uploader';
import { useHistory, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import './style.scss';
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';

// import { Editor, EditorState } from 'draft-js';

/*const RichtextEditor = () => {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  return (
    
  );
};*/

//const fileTypes = ['JPG', 'ZIP', 'PDF'];

/*function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = file => {
    setFile(file);
  };
  return (
    
  );
}*/

function BaseAssignments() {
  const params = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const MySource = `${baseUrl}/assignments/${params.assignmentId}/`;
  useEffect(() => {
    axios
      .get(`${baseUrl}/assignments/${params.assignmentId}/`)
      .then(res => {
        setAssignment(res.data);
        console.log('assignment', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'auto', marginTop: 24 }}>
          <ReactLoading type="spinningBubbles" color="#EF006C" height={100} width={100} />
        </div>
      ) : (
        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
            <img src={Pen} alt="Sleeping Fox" className="Apic" />
            <div className="txt">
              <Typography sx={{ width: '33%', flexShrink: 0, margin: 1 }}>{assignment.title}</Typography>
              <Typography sx={{ color: '#300404', margin: 1 }}>حل نشده &#128542;</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="Clful">
              <p className="mytxt">&#x2618; {ReactHtmlParser(assignment.question)}</p>
              <br />
              <Uploader />
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default BaseAssignments;
