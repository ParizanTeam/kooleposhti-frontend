import React, { useState , useEffect, useRef} from "react";
import axios from "../../utils/axiosConfig";
import { Button } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { useHistory, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
function App() {
  const [loading, setLoading] = React.useState(true);
  const [file, setFile] = useState(null);
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`<p>پاسخ من ...</p>`)))
  );
  const params= useParams();
  const UPLOAD_ENDPOINT =
    `${baseUrl}/assignments/${params.assignmentId}/submit/`;
  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(UPLOAD_ENDPOINT.answer)
        .then(response => {
          console.log(response.data);
          /* setEditorContent(response.data.data.bio); */
          setEditorState(
            EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(response.data.answer)))
          );
          console.log('content:', editorContent);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);
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
    formData.append("avatar", file);

    return await axios.post(UPLOAD_ENDPOINT.file, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  };

  const handleOnChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onContentStateChange = editorcontent => {
    setEditorContent(editorcontent);
  };

  const onEditorStateChange = editorstate => {
    setEditorState(editorstate);
  };

  return (
    <div className="App">
      <h1 className="MyHeader">پاسخ شما:</h1>
      <div className='editor'>
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
      <br/>
      <div className='MyUp'>
        <h2 className="MyHeader">آپلود فایل:</h2>
        <div className="Uplr" dir='ltr'>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleOnChange} />
            <div className="Bt">
              <button type="submit">ثبت</button>
            </div>
          </form>
        </div></div>
    </div>
  );
}

export default App;


//Modify the UPLOAD_ENDPOINT with the API URL.
//The uploaded file can be retreived via $_FILES['avatar'] on the server-side(PHP).