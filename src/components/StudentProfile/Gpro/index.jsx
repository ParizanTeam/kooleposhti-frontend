import HelloPro from '../../../assets/images/StudentProfile/HelloProG.jfif';
import './style.scss';

const Gpro = () => {
  return (
      <di className='GPro__Hello'>
        <br/>
          <span>سلام </span>
          <span>مرضیه </span>
          <span>عزیز</span>
          <p>به کوله پشتی خوش اومدی</p>
          <br/>
          <img src={HelloPro} alt="HelloDrearUser" className='GPro__Hello__media'/>
      </di>
  );
};
export default Gpro;
