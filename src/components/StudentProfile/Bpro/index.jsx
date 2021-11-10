import HelloPro from '../../../assets/images/StudentProfile/HelloProB.png';
import './style.scss';

const Bpro = () => {
  return (
      <di className='BPro__Hello'>
        <br/>
          <span>سلام </span>
          <span>مهران </span>
          <span>عزیز</span>
          <p>به کوله پشتی خوش اومدی</p>
          <br/>
          <img src={HelloPro} alt="HelloDrearUser" className='BPro__Hello__media'/>
      </di>
  );
};
export default Bpro;
