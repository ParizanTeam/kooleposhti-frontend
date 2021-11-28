import ProHello from '../../../assets/images/StudentProfile/ProHello.gif';
import './style.scss';
import { themeProps } from '../constant';

const Pro = ({ firstname }) => {
  return (
    <div className="Pro__Hello" style={{ backgroundColor: themeProps.secondaryColor,
     color: themeProps.primaryColor,boxShadow:`${themeProps.primaryColor} 0px 2px 10px` }}>
      <br />
      <span>سلام </span>
      <span>{firstname} </span>
      <span>عزیز</span>
      <p>به کوله پشتی خوش اومدی</p>
      <br />
      <img src={ProHello} alt="HelloDrearUser" className="Pro__Hello__media" />
    </div>
  );
};
export default Pro;
