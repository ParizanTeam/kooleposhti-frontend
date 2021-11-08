//import { useMobile } from '../../utils/detectSource';
import MyClasses from '../MyClasses';
import ClassesSearchBar from './ClassesSearchBar';
import Categories from '../Categories'
import './style.scss';

const SearchClasses = () => {
  return (
  <div>
    <MyClasses/>
    <br/>
    <div className="afterMyC-b">
      <ClassesSearchBar />
      <br/><br/>
      <div className="CTG">
      <Categories /></div>
    </div>
  </div>
  );
};
export default SearchClasses;