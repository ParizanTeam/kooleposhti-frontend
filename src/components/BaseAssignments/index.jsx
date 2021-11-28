//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pen from '../../assets/images/pen.png';
import Uploader from '../Uploader'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './style.scss';

import { useState } from 'react';


// import { Editor, EditorState } from 'draft-js';
import { Button } from '@mui/material';

const RichtextEditor = () => {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  return (
    <Editor
      wrapperClassName="rich-text-wrapper-class"
      editorClassName="rich-text-editor-class color"
      toolbarClassName="rich-text-toolbar-class Border"
      // wrapperStyle={<wrapperStyleObject>}
      // editorStyle={<editorStyleObject>}
      // toolbarStyle={<toolbarStyleObject>}
    />
  );
};

const fileTypes = ['JPG', 'ZIP', 'PDF'];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = file => {
    setFile(file);
  };
  return (
    <div className="App">
      <h1 className="MyHeader">پاسخ شما:</h1>
      <div className='editor'>
      <RichtextEditor /></div>
      <br/>
      <div className='MyUp'>
        <h2 className="MyHeader">آپلود فایل:</h2>
        <div className="Uplr" dir='ltr'>
          {/*<div>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
          </div>
          <div className="ovL" style={{ zIndex: 1, position: 'absolute' }}>
            <p className='dis'>فایلت رو بکش و</p>
            <p className='dis'>در قسمت سفید رنگ رها کن</p>
          </div>
          <p className="Box">{file ? `File name: ${file.name}` : 'هنوز فایلی آپلود نشده!'}</p>*/}
          <Uploader/>
        </div></div>
      <div className="Bt">
        <Button>
          <p className="Bt__txt">ثبت</p>
        </Button>
      </div>
    </div>
  );
}

function BaseAssignments() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={true} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <img src={Pen} alt="Sleeping Fox" className="Apic" />
          <div className="txt">
            <Typography sx={{ width: '33%', flexShrink: 0, margin: 1 }}>تمرین اول</Typography>
            <Typography sx={{ color: '#292269', margin: 1 }}>حل نشده &#128542;</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="Clful">
            <p className="mytxt">&#x2618; گربه ای در یک اتاق شش گوشه خوابیده است این گربه چند زاویه می بیند؟</p>
            <br />
            <DragDrop />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BaseAssignments;
