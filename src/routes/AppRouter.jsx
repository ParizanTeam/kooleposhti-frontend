import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import NotFoundPage from '../components/NotFoundPage';
import EmailVerification from '../components/EmailVerification';
import ForgetPasswordPage from '../components/ForgetPasswordPage';
import ResetPasswordPage from '../components/ResetPasswordPage';
import TeacherDashboard from '../components/TeacherDashboard';
import ClassSchedule from '../components/ClassSchedule';
import BookMarkedClasses from '../components/BookMarkedClasses';
import { Redirect } from 'react-router';
import StudentProfile from '../components/StudentProfile';
import ClassCalendar from '../components/ClassCalendar';

const AppRouter = () => {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/email-verification" exact render={props => <EmailVerification {...props} />} />
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          {<SignupPage />}
        </Route>
        <Route path="/dashboard/teacher/" exact>
          <Redirect to="/dashboard/teacher/profile" />
        </Route>
        <Route path="/dashboard/teacher/">
          <TeacherDashboard />
        </Route>
        <Route path="/forget-password" exact>
          <ForgetPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>

        


        {/* student dasgboard classes url */}
        <Switch>
          <Route path="/dashboard/student/Schedule" exact>
            <ClassSchedule/>
          </Route>
          <Route path="/dashboard/student/Bookmarks" exact>
            <BookMarkedClasses/>
          </Route>
          <Route path="/dashboard/student/" exact>
            <Redirect to="/dashboard/student/Profile" />
          </Route>
          <Route path="/dashboard/student/Calendar">
            <ClassCalendar />
          </Route>  
          <Route path="/dashboard/student/Profile">
            <StudentProfile />
          </Route> 
        <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
     
        {/* end student dasgboard classes url */}

      </Switch>


    </Router>
  );
};

export default AppRouter;