//import { useMobile } from '../../utils/detectSource';
import MyClasses from '../MyClasses';
import MyClassesFooter from '../MyClasses/MyClassesFooter';
import './style.scss';
import MyCalendar from '../MyCalendar';

const ClassCalendar = () => {
  return (
  <div>
    <MyClasses/>
    <img src='https://8pic.ir/uploads/1307925801537355428-128.png' alt='cc' className='ccImg'/>
    <br/>
    <div className="afterMyC-b">
      <MyCalendar />
    </div>
    <MyClassesFooter />
  </div>
  );
};
export default ClassCalendar;