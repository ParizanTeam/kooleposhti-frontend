import { react, useState } from 'react';
import imageSrc from '../../assets/images/default-student-profile.jpg';
import './style.scss';

const StudentProfileCard = () => {
  const [username, setUsername] = useState('moshfa');
  const [firstname, setFirstname] = useState('مرتضی');
  const [lastname, setLastname] = useState('شهرابی فراهانی');
  const [bio, setBio] = useState('یک دانشجوی مهندسی کامپیوتر که علاقه ی زیادی به یادگیری مطالب جدید و کاربردی دارد.');
  const [age, setAge] = useState('۲۰');

  return (
    <div className="student-profile-card-default-page-setting">
      <div className="student-profile-card-container">
        <div className="student-profile-card-upper-part">
          <div className="student-profile-card-upper-part__image">
            <img src={imageSrc} alt="" height="150px" width="150px" />
          </div>
        </div>
        <div className="student-profile-card-lower-part">
          <div className="student-profile-card-lower-part__username">
            <h2>{username}</h2>
          </div>
          <div className="student-profile-card-lowerr-part__name">
            <div className="student-profile-card-lower-part__name__firstname">
              <h4>{firstname}</h4>
            </div>
            <div className="student-profile-card-lower-part__name__lastname">
              <h4>{lastname}</h4>
            </div>
          </div>
          <div className="student-profile-card-lower-part__bio">
            <p className="student-profile-card-lower-part__bio__text">{bio}</p>
          </div>
          <div className="student-profile-card-lower-part__age">
            <p>سن: {age}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
