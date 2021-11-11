//import { useMobile } from '../../utils/detectSource';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './style.scss';

const MyClasses = () => {
  return (
    <div className="My">
        <div className="Head">
            <img
            style={{ position: 'absolute', width: '100%',height: '300px', objectFit: 'cover', zIndex: -1 }}
            src="https://8pic.ir/uploads/fall-banner-1.jpg"
            alt="Head"
            />
            <p className="Head__content">&#127809; اینجا همیشه مهره!</p>
            <div className="HeadSub__ClickedOnMe">
                <Link to= "/" className="HeadSub__ClickedOnMe__a">
                <p>&#x2602;</p></Link>
                <p className="HeadSub__ClickedOnMe__c">&#x2602;</p>
                <p className="HeadSub__ClickedOnMe__b">&#x2602;</p>
            </div>
            <div className="HeadSub">
                <div className="HeadSub__Ia">
                <Link to="/dashboard/student/Bookmarks">
                <Button>
                    <p className="HeadSub__Ia__cont">کلاسهای محبوب من</p>
                    <p className="HeadSub__Ia__cont-b">محبوب های من</p>
                </Button></Link></div>
                <div className="HeadSub__Ic">
                    <Link to="/dashboard/student/Search">
                    <Button>
                    <p className="HeadSub__Ic__cont">جستجو در کلاسها</p>
                    <p className="HeadSub__Ic__cont-b">جستجو در کلاسها</p>
                </Button></Link></div>
                <div className="HeadSub__Ib">
                    <Link to="/dashboard/student/Schedule">
                    <Button>
                    <p className="HeadSub__Ib__cont">تقویم کلاسهای من</p>
                    <p className="HeadSub__Ib__cont-b">تقویم من</p>
                    </Button></Link></div>
            </div>
        </div>

        <div className="SubCont">

        </div>
    </div>
  );
};
export default MyClasses;
