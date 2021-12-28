//import { useMobile } from '../../utils/detectSource';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';
import './style.scss';

const StudentDashboardHeader = () => {
  const themeProps = useSelector(state => state.theme);

  return (
    <div>
      <Navbar color={themeProps.primaryColor} />
      <div className="My">
        <div className="Head">
          <img
            style={{ position: 'absolute', width: '100%', height: '300px', objectFit: 'cover', zIndex: -1 }}
            src={themeProps.bgImage}
            alt="Head"
          />
          <p className="Head__content">&#127809; اینجا همیشه مهره!</p>
          <div className="HeadSub__ClickedOnMe">
            <Link to="/" className="HeadSub__ClickedOnMe__a">
              <p>&#x2602;</p>
            </Link>
            <p className="HeadSub__ClickedOnMe__c">&#x2602;</p>
            <p className="HeadSub__ClickedOnMe__b">&#x2602;</p>
          </div>
          <div className="HeadSub">
            <div className="HeadSub__Ia">
                <Button component={Link} to="/dashboard/student/Bookmarks" sx={{ '&:hover': { color: 'transparent' } }}>
                  <p className="HeadSub__Ia__cont">کلاسهای محبوب من</p>
                  <p className="HeadSub__Ia__cont-b">محبوبهای من</p>
                </Button>

            </div>
            <div className="HeadSub__Ic">
                <Button component={Link} to="/dashboard/student/assignments" sx={{ '&:hover': { color: 'transparent' } }}>
                  <p className="HeadSub__Ic__cont">چالشهای من</p>
                  <p className="HeadSub__Ic__cont-b">چالشهای من</p>
                </Button>

            </div>
            <div className="HeadSub__Ib">
                <Button component={Link} to="/dashboard/student/ClassesList" sx={{ '&:hover': { color: 'transparent' } }}>
                  <p className="HeadSub__Ib__cont">لیست کلاسهای من</p>
                  <p className="HeadSub__Ib__cont-b">کلاسهای من</p>
                </Button>
            </div>
          </div>
        </div>

        <div className="SubCont"></div>
      </div>
    </div>
  );
};
export default StudentDashboardHeader;
