//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import { useState , useEffect, useRef} from "react";
import Accordion from '@mui/material/Accordion';
import axios from "../../utils/axiosConfig";
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Pen from '../../assets/images/pen.png';
import Uploader from '../Uploader';
import { useHistory, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import './style.scss';


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
  const params= useParams();
  const [Assignment, setAssignment] = useState(null);
  const MySource =
    `${baseUrl}/assignments/${params.assignmentId}/`;
  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(MySource)
        .then(response => {
          console.log(response.data);
        });
    }
    fetchData();
  }, []);
  return (
    <div>
      <Accordion expanded={true}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <img src={Pen} alt="Sleeping Fox" className="Apic" />
          <div className="txt">
            <Typography sx={{ width: '33%', flexShrink: 0, margin: 1 }}>تمرین اول</Typography>
            <Typography sx={{ color: '#300404', margin: 1 }}>حل نشده &#128542;</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="Clful">
            <p className="mytxt">&#x2618; {params.assignmentId.title}</p>
            <br />
            <Uploader />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BaseAssignments;
