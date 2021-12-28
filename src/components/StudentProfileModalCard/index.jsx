import { react, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import imageSrc from '../../assets/images/default-student-profile.jpg';
import apiInstance from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './style.scss';
import { height, width } from '@mui/system';
import ReactHtmlParser from 'react-html-parser';

const StudentProfileCard = props => {
  const { showProfile, setShowProfile } = props;
  const [resData, setResData] = useState([]);
  const params = useParams();

  const handleClose = () => {
    setShowProfile({ ...showProfile, profileOpen: false });
  };

  // const token = 'JWT ' + localStorage.getItem('access_token');
  // const studentUsername = params.studentUsername;
  const studentUsername = showProfile.username;
  // console.log(showProfile.username);
  console.log(studentUsername);

  useEffect(() => {
    async function fetchData() {
      const res = await apiInstance
        .get(`${baseUrl}/accounts/profile/public/${showProfile.username}/`)
        .then(response => {
          console.log('get response: ', response);
          setResData(response.data.data);
        })
        .catch(err => {
          console.log('error is: '.err);
        });
    }
    fetchData();
  }, [showProfile.username]);

  return (
    <>
      <Dialog
        open={showProfile.profileOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // className="student-profile-modal-card"
        // style={{ width: '300px', height: '500px' }}
      >
        <DialogTitle>
          <div className="student-profile-modal-card-upper-part">
            <div className="student-profile-card-upper-part__image">
              {resData.image != null ? (
                <img src={resData.image} alt="" height="150px" width="150px" />
              ) : (
                <img src={imageSrc} alt="" height="150px" width="150px" />
              )}
              {/* <img src={resData.image} alt="" height="150px" width="150px" /> */}
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="student-profile-card-lower-part">
              <div
                className="student-profile-card-lower-part__username"
                style={{ display: resData.username == null ? null : 'block' }}
              >
                <h2>{resData.username}</h2>
              </div>
              <div
                className="student-profile-card-lowerr-part__name"
                style={{ display: resData.first_name == null && resData.last_name == null ? null : 'block' }}
              >
                <div className="student-profile-card-lower-part__name__firstname">
                  <h4>{resData.first_name}</h4>
                </div>
                <div className="student-profile-card-lower-part__name__lastname">
                  <h4>{resData.last_name}</h4>
                </div>
              </div>
              <div
                className="student-profile-card-lower-part__bio"
                style={{ display: resData.bio == null ? null : 'block' }}
              >
                <p className="student-profile-card-lower-part__bio__text">{ReactHtmlParser(resData.bio)}</p>
              </div>
              <div
                className="student-profile-card-lower-part__age"
                style={{ display: resData.age == null ? null : 'block', marginBottom: 20 }}
              >
                {resData.age != null ? <p>سن: {resData.age}</p> : <p></p>}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* {showProfile.profileOpen ? (
        <div className="student-profile-card-default-page-setting">
          <div className="student-profile-card-container">
            <div className="student-profile-card-upper-part">
              <div className="student-profile-card-upper-part__image">
                {resData.image != null ? (
                  <img src={resData.image} alt="" height="150px" width="150px" />
                ) : (
                  <img src={imageSrc} alt="" height="150px" width="150px" />
                )}
                {/* <img src={resData.image} alt="" height="150px" width="150px" /> */}
      {/* </div>
            </div>
            <div className="student-profile-card-lower-part">
              <div className="student-profile-card-lower-part__username">
                <h2>{resData.username}</h2>
              </div>
              <div className="student-profile-card-lowerr-part__name">
                <div className="student-profile-card-lower-part__name__firstname">
                  <h4>{resData.first_name}</h4>
                </div>
                <div className="student-profile-card-lower-part__name__lastname">
                  <h4>{resData.last_name}</h4>
                </div>
              </div>
              <div className="student-profile-card-lower-part__bio">
                <p className="student-profile-card-lower-part__bio__text">{resData.bio}</p>
              </div>
              <div className="student-profile-card-lower-part__age">
                {resData.age != null ? <p>سن: {resData.age}</p> : <p></p>}
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
    </>
  );
};

export default StudentProfileCard;
