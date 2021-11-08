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
import SearchClasses from '../components/SearchClasses';
import { Redirect } from 'react-router';

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
        <Route path="/teacher/dashboard" exact>
          <Redirect to="/teacher/dashboard/profile" />
        </Route>
        <Route path="/teacher/dashboard/">
          <TeacherDashboard />
        </Route>
        <Route path="/forget-password" exact>
          <ForgetPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>

        {/* teacher dashbaors url */}
        <Switch>
          <Route path="/dashboard/profile" exact>
            <TeacherDashboard>
              <h1>پروفایل</h1>
            </TeacherDashboard>
          </Route>
          <Route path="/dashboard/teacher" exact>
            <TeacherDashboard>
              <h1>کیف پول</h1>
            </TeacherDashboard>
          </Route>
          <Route path="/dashboard/student" exact>
            <TeacherDashboard>
              <h1>کلاسها</h1>
            </TeacherDashboard>
          </Route>
        {/* end teacher dashboard url */}

        {/* MyClasses url */}
        <Switch>
          <Route path="/dashboard/student/Schedule" exact>
            <ClassSchedule/>
          </Route>
          <Route path="/dashboard/student/Bookmarks" exact>
            <BookMarkedClasses/>
          </Route>
          <Route path="/dashboard/student/Search">
            <SearchClasses />
          </Route>  
        <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        </Switch>
        {/* end MyClasses url */}

      </Switch>


    </Router>
  );
};

export default AppRouter;
