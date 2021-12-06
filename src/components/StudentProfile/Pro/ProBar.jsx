import UsreIcon from '../../../assets/images/StudentProfile/UsreIcon.png';
import './style.scss';
import { themeProps } from '../constant';

const ProBar = ({firstname,lastname}) => {
  return (
      <div className='WhoiS' style={{ backgroundColor: themeProps.primaryColor,
     color: themeProps.secondaryColor,boxShadow:`${themeProps.primaryColor} 0px 2px 10px` }}>
        <br/>
        <img src={UsreIcon} alt="UserProfile" className='WhoiS__media'/>
        <span className='WhoiS__content'>{firstname} {lastname}</span>
        <br/>
      </div>
  );
};
export default ProBar;