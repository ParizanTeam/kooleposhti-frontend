//import { useMobile } from '../../utils/detectSource';
import MyClasses from '../MyClasses';
import MyClassesFooter from '../MyClasses/MyClassesFooter';
import './style.scss';
import MyCalendar from '../MyCalendar';

const ClassCalendar = () => {
  return (
  <div>
    <MyClasses/>
    <br/>
    <div className="afterMyC-b">
      <MyCalendar />
    </div>
    <MyClassesFooter />
  </div>
  );
};
export default ClassCalendar;