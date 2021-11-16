import ProHello from '../../../assets/images/StudentProfile/ProHello.gif';
import './style.scss';

const Pro = () => {
  return (
      <di className='Pro__Hello'>
        <br/>
          <span>سلام </span>
          <span>مریم </span>
          <span>عزیز</span>
          <p>به کوله پشتی خوش اومدی</p>
          <br/>
          <img src={ProHello} alt="HelloDrearUser" className='Pro__Hello__media'/>
      </di>
  );
};
export default Pro;
