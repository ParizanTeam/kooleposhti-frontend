import { react, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import imageSrc from '../../assets/images/default-student-profile.jpg';
import apiInstance from '../../utils/axiosConfig';
import { baseUrl } from '../../utils/constants';
import './style.scss';

const StudentProfileCard = () => {
  const [resData, setResData] = useState([]);
  const params = useParams();

  // const token = 'JWT ' + localStorage.getItem('access_token');
  const studentUsername = params.studentUsername;

  useEffect(() => {
    async function fetchData() {
      const res = await apiInstance
        .get(`${baseUrl}/accounts/profile/public/${studentUsername}/`)
        .then(response => {
          console.log('get response: ', response);
          setResData(response.data.data);
        })
        .catch(err => {
          console.log('error is: '.err);
        });
    }
    fetchData();
  }, []);

  return (
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
          </div>
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
  );
};

export default StudentProfileCard;
