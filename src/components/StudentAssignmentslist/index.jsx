//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import BaseAssignmentsList from '../BaseAssignmentsList';
import AssignHeader from './StudentAssignmentsHeader';
import TheFooter from './StudentAssignmentsFooter';
import Navbar from '../Navbar'
import './style.scss';

function StudentAssignmentslist(){

  return (
    <div>
    <div className='Lmymain'>
      <Navbar color='#ffb0c4'/>
      <AssignHeader/>
      <div className='ClassNM'>
        <span className='ClassNM__ic'>&#9998;</span>
        <span >چالشهای سخنرانی در جمع</span>
      </div>
      <div className='LAsDiv'>
        <BaseAssignmentsList/>
      </div></div>
      <TheFooter/>
    </div>
  );
}

export default StudentAssignmentslist;