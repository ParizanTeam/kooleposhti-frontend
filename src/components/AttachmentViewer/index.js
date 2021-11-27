import React, { useState } from 'react';
import './style.scss';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CircularProgress from '@mui/material/CircularProgress';
import { AppBar, Toolbar, Avatar, Tooltip, Button, IconButton } from '@mui/material';

const PWAttachmentViewer = ({ attachment, onClose, onDelete }) => {
  const [maxHeightReached, setMaxHeightReached] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    uploader: { username, userImage },
    name,
    link,
    createdAt,
    mimetype,
  } = attachment;

  const downloadFile = () => {
    window.open(link);
  };

  let attachmentJSX = null;
  if (mimetype.startsWith('image/')) {
    let imageStyles = {};
    if (maxHeightReached) {
      imageStyles = {
        maxHeight: document.documentElement.clientHeight - 90,
        width: 'unset',
      };
    }
    imageStyles.opacity = imageLoaded ? 1 : 0;
    attachmentJSX = (
      <div className='image-container'>
        <img
          alt="Attachment"
          id="image"
          onLoad={() => {
            const image = document.getElementById('image');
            if (image && image.clientHeight > document.documentElement.clientHeight - 70) {
              setMaxHeightReached(true);
            }
            setImageLoaded(true);
          }}
          src={link}
          style={imageStyles}
        />
        {(imageLoaded) ? null : <CircularProgress />}
      </div>
    );
  } else if (mimetype.startsWith('video/')) {
    attachmentJSX = (
      <div className='video-container'>
        <video controls>
          <source src={link} type={mimetype} />
          {'مرورگر شما متاسفانه قابلیت پیش نمایش ویدیو پشتیبانی نمیکند.'}
        </video>
      </div>
    );
  } else if (mimetype.startsWith('application/pdf')) {
    attachmentJSX = (
      <div className='pdf-container'>
        <embed src={link} />
      </div>
    );
  } else if (
    name.endsWith('doc') ||
    name.endsWith('docx') ||
    name.endsWith('ppt') ||
    name.endsWith('pptx') ||
    name.endsWith('xls') ||
    name.endsWith('xlsx')
  ) {
    attachmentJSX = (
      <div className='office-file-container'>
        <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${link}`} title="Attachment">
          {'This is an embedded '}
          <a href="http://office.com" rel="noopener noreferrer" target="_blank">
            {'Microsoft Office'}
          </a>
          {' document, powered by '}
          <a href="http://office.com/webapps" rel="noopener noreferrer" target="_blank">
            {'Office Online'}
          </a>
        </iframe>
      </div>
    );
  } else {
    attachmentJSX = (
      <div>
        <p className='no-preview'>
          {'متاسفانه فایل مورد نظر قابلیت پیش نمایش ندارد.'}
          <span onClick={downloadFile}>{'Download'}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <AppBar style={{ color: 'white', backgroundColor: 'black' }}>
        <Toolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={userImage} sx={{ borderRadius: '50%', marginLeft: '10px' }} />
            {username} | {createdAt}
          </div>
          <div style={{ marginRight: 'auto', display: 'flex' }}>
            <Tooltip title="دانلود فایل">
              <IconButton onClick={downloadFile}>
                <FileDownloadIcon sx={{ color: 'white', marginLeft: '10px' }}  />
              </IconButton>
            </Tooltip>

            {onDelete ? (
              <>
                <Tooltip title="حذف فایل">
                  <IconButton onClick={onDelete}>
                    <DeleteIcon sx={{ color: 'white', marginLeft: '10px' }} />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
            <Tooltip title="بستن">
              <IconButton onClick={onClose}>
                <ClearIcon sx={{ color: 'white', marginLeft: '10px' }} />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <div className='attachment-preview-container'>{attachmentJSX}</div>
    </div>
  );
};

export default PWAttachmentViewer;
