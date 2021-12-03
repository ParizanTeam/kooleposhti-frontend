//import { useMobile } from '../../utils/detectSource';
import * as React from 'react';
import BaseAssignments from '../BaseAssignments';
import AssignHeader from './StudentAssignmentsHeader';
import TheFooter from './StudentAssignmentsFooter';
import Navbar from '../Navbar'
import './style.scss';

function StudentAssignments(){

  return (
    <div>
    <div className='mymain'>
      <Navbar color='#4dd3d8'/>
      <AssignHeader/>
      <div className='AsDiv'>
        <BaseAssignments/>
      </div></div>
      <TheFooter/>
    </div>
  );
}

export default StudentAssignments;