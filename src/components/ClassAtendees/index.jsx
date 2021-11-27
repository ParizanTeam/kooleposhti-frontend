import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiInstance from '../../utils/axiosConfig';

const ClassAtendees = () => {
  const params = useParams();
  const classId = params.classId;
  const [students, setStudents] = useState(null);

  useEffect(() => {
    // `http://185.239.106.239/courses/${classId}/students/`

    apiInstance.get(`https://kooleposhti.herokuapp.com/courses/${classId}/students/`).then(res => {
      console.log(res.data);
    });
    apiInstance.get(`https://kooleposhti.herokuapp.com/courses/${classId}/role/`).then(res => {
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <h3>لیست شرکت‌کنندگان کلاس</h3>
    </div>
  );
};

export default ClassAtendees;
