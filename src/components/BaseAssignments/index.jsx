//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pen from '../../assets/images/pen.png';

import './style.scss';

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";


import {Editor, EditorState} from 'draft-js';
import { Button } from '@mui/material';

const RichtextEditor = () => {
  const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
  return (
    <div className='editor'>
      <Editor editorState={editorState} onChange={setEditorState}/>
    </div>
  )
  }

const fileTypes = ["JPG","ZIP","PDF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="App">
      <h1 className='MyHeader'>پاسخ شما:</h1>
      <RichtextEditor/>
      <div className='Uplr'>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>
      <p className='Box'>{file ? `File name: ${file.name}` : "هنوز فایلی آپلود نشده!"}</p></div>
      <div className='Bt'>
        <Button>
        <p className='Bt__txt'>ثبت</p></Button>
      </div>
    </div>
  );
}

function BaseAssignments(){
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={true} onChange={handleChange('panel1')}>
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
          <Typography sx={{ color: '#292269', margin: 1}}>حل نشده &#128542;</Typography></div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='Clful'>
          <p className='mytxt'>&#x2618; گربه ای در یک اتاق شش گوشه خوابیده است این گربه چند زاویه می بیند؟</p>
          <br/>
          <DragDrop/>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BaseAssignments;