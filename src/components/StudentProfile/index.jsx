import Gpro from './Gpro';
import Bpro from './Bpro';
import Pro from './Pro';
import ProBar from './Pro/ProBar';
import './style.scss';


const StudentProfile = () => {
  return (
    <div className='mainPro'>
        <div className='RightBar'>
          <ProBar />
          <Pro />
        </div>
        <div className='Forms'>
        </div>
      
    </div>
  );
};
export default StudentProfile;
