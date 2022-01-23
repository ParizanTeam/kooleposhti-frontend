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
import { useSelector } from 'react-redux';
import { convertNumberToPersian } from '../../utils/helpers';
import AttachmentViewer from '../AttachmentViewer';
import './style.scss';
import { flexbox } from '@mui/system';
const mime_types = {
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  docx: 'document',
  pdf: 'application',
  video: 'mp4',
};

const convertDateToJalali = input => {
  const JDate = require('jalali-date');
  const date = new Date(input);
  const jdate = new JDate(date).format('dddd DD MMMM YYYY');
  return jdate;
};

function App() {
  const params = useParams();
  const [myAns, setMyAns] = useState('پاسخ من');
  const [previousFile, setPreviousFile] = useState(null);
  const [fileDate, setFileDate] = useState(new Date());
  const [hwId, setHwId] = useState(new Date());


  const [previousAns, setPreviousAns] = useState('پاسخ من');
  const user = useSelector(state => state.auth);

  // const [attachmentFile , setAttachmentFile]= useState(null);
  const [attachmentToView, setAttachmentToView] = React.useState(null);

  const previewFile = (file, isLocal) => {
    let name = user.username;

    if (user.first_name) {
      name = user.first_name;
      if (user.last_name) name = `${user.first_name} ${user.last_name}`;
    }
    const filename = decodeURI(isLocal ? file.name : file.split('/').at(-1));
    const file_adrr = isLocal ? URL.createObjectURL(file) : `https://kooleposhti.ml${file}`;
    const file_format = filename.split('.').at(-1);
    const mime_type = `${mime_types[file_format]}/${file_format}`;
    const submited_date = convertDateToJalali(fileDate);

    return {
      id: 1,
      uploader: {
        username: name,
        userImage: user.image ? user.image.image : null,
      },
      name: filename,
      link: file_adrr,
      createdAt: convertNumberToPersian(submited_date),
      mimetype: mime_type,
    };
  };
  const MySource = `${baseUrl}/assignments/${params.assignmentId}/submit/`;
 

  useEffect(() => {
    axios
      .get(`${baseUrl}/assignments/${params.assignmentId}/submit/me`)
      .then(res => {
        setEditorState(
          EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(res.data.answer)))
        );
        console.log('content:', editorContent);
        console.log('student answer', res.data);

        setMyAns(editorContent);
        setPreviousFile(res.data.file);
        setPreviousAns(res.data.answer);
        setFileDate(res.data.submited_date);
        setHwId(res.data.id)
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
    console.log('file', file);
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
    toast.info('🦄 درحال بارگذاری پاسخ شما ...', {
      position: 'bottom-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('answer', myAns);
    console.log(previousFile);
    console.log(previousAns);
    if (previousFile || previousAns !== 'پاسخ من') {
      await axios.patch(`${baseUrl}/assignments/${params.assignmentId}/submit/${hwId}/`, formData).then(res => {
        setFile(null);
        setPreviousFile(res.data.file);
      });
      return toast.success('پاسخ شما با موفقیت ویرایش شد.');
    }
    await axios.post(MySource, formData).then(res => {
      setFile(null);
      setPreviousFile(res.data.file);
    });
    return toast.success('پاسخ شما با موفقیت ثبت شد.');
  };

  const handleOnChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileDate(new Date());
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
        <div className="Uplr" dir="rtl">
          <form onSubmit={handleSubmit}>
            {/*<DragDrop/>*/}
            <label for="file" onChange={handleOnChange}>
              <img src={gloves} alt="gloves" style={{ width: '100px', margin: '5px', cursor: 'pointer' }} />
            </label>
            <input
              accept=".jpg,.png,.jpeg,.docx,.pdf,.mp4"
              type="file"
              id="file"
              name="file"
              style={{ display: 'none' }}
              onChange={handleOnChange}
            />
            {/* <img src={gloves} alt="gloves" style={{width:'50px', margin:'5px'}}/>
  <input type="file" onChange={handleOnChange} />*/}
            {/*<div className="Bt">
              <button type="submit">ثبت</button>
            </div>
          */}
          </form>
        </div>
        <div className="make-center">
          {file ? (
            <div className="uploadfile-preview-btn" onClick={() => setAttachmentToView(previewFile(file, true))}>
              پیش‌نمایش فایل آپلود شده
            </div>
          ) : (
            <>
              {previousFile && (
                <div
                  className="uploadfile-preview-btn"
                  onClick={() => setAttachmentToView(previewFile(previousFile, false))}
                >
                  مشاهده فایل آپلود شده
                </div>
              )}
            </>
          )}
        </div>

        {attachmentToView ? (
          <AttachmentViewer
            attachment={attachmentToView}
            // onDelete={}
            onClose={() => setAttachmentToView(null)}
          />
        ) : null}
      </div>
      <div className="Bt">
        <Button onClick={handleSubmit}>
          <p className="Bt__txt">
         { !(previousFile || previousAns)  ? 'ثبت' : 'ثبت تغییرات'}
            </p>
        </Button>
      </div>
    </div>
  );
}

export default App;

//Modify the UPLOAD_ENDPOINT with the API URL.
//The uploaded file can be retreived via $_FILES['avatar'] on the server-side(PHP).
