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
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <img src={Pen} alt='Sleeping Fox'className='Apic'/>
          <div className='txt'>
          <Typography sx={{ width: '33%', flexShrink: 0 ,margin: 1}}>
            سوال 1
          </Typography>
          <Typography sx={{ color: '#292269', margin: 1}}>حل شده</Typography></div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='Clful'>
          <DragDrop/>
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
          <Typography sx={{ width: '33%', flexShrink: 0,margin: 1 }}>سوال 2</Typography>
          <Typography sx={{ color: '#292269',margin: 1 }}>
            حل نشده
          </Typography></div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='Clful'>
          <DragDrop/>
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
            سوال 3
          </Typography>
          <Typography sx={{ color: '#292269' ,margin: 1}}>
            حل شده 
          </Typography></div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='Clful'>
          <DragDrop/>
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
          <Typography sx={{ width: '33%', flexShrink: 0 ,margin: 1}}>سوال 4</Typography>
          <Typography sx={{ color: '#292269',margin: 1 }}>
            حل نشده
          </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className='Clful'>
          <DragDrop/>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BaseAssignments;