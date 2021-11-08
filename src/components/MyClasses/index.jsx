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
                <p className="HeadSub__ClickedOnMe__a">&#x2602;</p>
                <p className="HeadSub__ClickedOnMe__c">&#x2602;</p>
                <p className="HeadSub__ClickedOnMe__b">&#x2602;</p>
            </div>
            <div className="HeadSub">
                <div className="HeadSub__Ia">
                <Link to="/dashboard/student/Bookmarks">
                <Button>
                    <p className="HeadSub__Ia__cont">کلاسهای نشان شده &#x2665;</p>
                    <p className="HeadSub__Ia__cont-b"> نشان‌شده‌ها &#x2665;</p>
                </Button></Link></div>
                <div className="HeadSub__Ic">
                    <Link to="/dashboard/student/Search">
                    <Button>
                    <p className="HeadSub__Ic__cont">جست و جو در کلاسها &#x2766;</p>
                    <p className="HeadSub__Ic__cont-b">جستجو &#x2766;</p>
                </Button></Link></div>
                <div className="HeadSub__Ib">
                    <Link to="/dashboard/student/Schedule">
                    <Button>
                    <p className="HeadSub__Ib__cont">تقویم کلاسهای من &#x2744;</p>
                    <p className="HeadSub__Ib__cont-b">تقویم &#x2744;</p>
                    </Button></Link></div>
            </div>
        </div>

        <div className="SubCont">

        </div>
    </div>
  );
};
export default MyClasses;
