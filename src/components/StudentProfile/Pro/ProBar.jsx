import UsreIcon from '../../../assets/images/StudentProfile/UsreIcon.png';
import './style.scss';

const ProBar = () => {
  return (
      <div className='WhoiS'>
        <br/>
        <img src={UsreIcon} alt="UserProfile" className='WhoiS__media'/>
        <span className='WhoiS__content'>مریم شمس</span>
        <br/>
      </div>
  );
};
export default ProBar;