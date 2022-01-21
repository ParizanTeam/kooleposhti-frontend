import React, { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axiosConfig';
import { Button } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { useHistory, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import draftToHtml from 'draftjs-to-html';
import gloves from '../../assets/images/uploadGloves.png';
import DragDrop from './DragDrop';
function App() {
  const params = useParams();
  const [myAns, setMyAns] = useState('پاسخ من');
  const MySource = `${baseUrl}/assignments/${params.assignmentId}/submit/`;
  useEffect(() => {
    axios
      .get(`${baseUrl}/assignments/${params.assignmentId}/submit/me`)
      .then(res => {
        setEditorState(
          EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(res.data.answer)))
        );
        console.log('content:', editorContent);
        setMyAns(editorContent);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);
  const [loading, setLoading] = React.useState(true);
  const [file, setFile] = useState(null);
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`<p>پاسخ من ...</p>`)))
  );
  const handleChange = file => {
    setFile(file);
  };
  /*const [assignments, setAssignments] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${baseUrl}/accounts/students/assignments/`)
      .then(res => {
        setAssignments(res.data);
        console.log('students assignments', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);*/

  const handleSubmit = async e => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);
    console.log(res.data);
  };

  const uploadFile = async file => {
    const formData = new FormData();
    if(file)formData.append('file', file);
    formData.append('answer', myAns);
    await axios.post(MySource, formData);
    return toast.success('پاسخ شما با موفقیت ثبت شد.');
  };

  const handleOnChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onContentStateChange = editorcontent => {
    setEditorContent(editorcontent);
    setMyAns(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const onEditorStateChange = editorstate => {
    setEditorState(editorstate);
  };

  return (
    <div className="App">
      <h1 className="MyHeader">پاسخ شما:</h1>
      <div className="editor">
        <Editor
          defaultEditorState={editorState}
          editorState={editorState}
          editorContent={editorContent}
          wrapperClassName="rich-text-wrapper-class"
          editorClassName="rich-text-editor-class color"
          toolbarClassName="rich-text-toolbar-class Border"
          onContentStateChange={onContentStateChange}
          onEditorStateChange={onEditorStateChange}
          // wrapperStyle={<wrapperStyleObject>}
          // editorStyle={<editorStyleObject>}
          // toolbarStyle={<toolbarStyleObject>}
        />
      </div>
      <br />
      <div className="MyUp">
        <h2 className="MyHeader">آپلود فایل:</h2>
        <div className="Uplr" dir="ltr">
          <form onSubmit={handleSubmit}>
            {/*<DragDrop/>*/}
          <label for="file" onChange={handleOnChange}>
          <img src={gloves} alt="gloves" style={{width:'50px', margin:'5px'}}/>
          </label>
  <input type="file" id="file" name="file" style={{display:'none'}} onChange={handleOnChange}/>
          {/* <img src={gloves} alt="gloves" style={{width:'50px', margin:'5px'}}/>
  <input type="file" onChange={handleOnChange} />*/}
            {/*<div className="Bt">
              <button type="submit">ثبت</button>
            </div>
          */}
          </form>
        </div>
      </div>
      <div className="Bt">
        <Button onClick={handleSubmit}>
          <p className="Bt__txt">ثبت</p>
        </Button>
      </div>
    </div>
  );
}

export default App;

//Modify the UPLOAD_ENDPOINT with the API URL.
//The uploaded file can be retreived via $_FILES['avatar'] on the server-side(PHP).
