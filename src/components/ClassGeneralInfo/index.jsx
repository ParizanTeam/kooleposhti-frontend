import React from 'react';
import CourseDates from '../CourseDates';
import './style.scss';

const ClassGeneralInfo = ({ role, info }) => {
  console.log(info);
  return (
    <div>
      <h2 className="class-info__title">کلاس {info.title}</h2>
      <div className="class-info__skyroom">
        <p className="class-info__skyroom-description">برای ورود به کلاس روی لینک زیر کلیک کنید.</p>
        <a href={info.link} target="_blank">
          <button className="class-info__skyroom-btn info-btn">لینک ورود به کلاس</button>
        </a>
      </div>
      <CourseDates sessions={info.sessions} />
    </div>
  );
};

export default ClassGeneralInfo;
