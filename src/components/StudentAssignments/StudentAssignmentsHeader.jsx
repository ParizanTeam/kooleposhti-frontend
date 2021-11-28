import MyG from "../../assets/images/MyG.png"
import './style.scss';

const AssignHeader = () => {
    return(
        <div className='AssignH__Hello'>
        <br/>
          <p>وقتشه خودتو به چالش بکشی!</p>
          <br/>
          <img src={MyG} alt="HelloDrearUser" className='AssignH__Hello__media'/>
      </div>
    )
};
export default AssignHeader;