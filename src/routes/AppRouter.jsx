import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import NotFoundPage from '../components/NotFoundPage';
import EmailVerification from '../components/EmailVerification';
import ForgetPasswordPage from '../components/ForgetPasswordPage';
import ResetPasswordPage from '../components/ResetPasswordPage';
import CreateCourseForm from '../components/CreateCourseForm';
import CoursePage from '../components/CoursePage';
import ClassDashboard from '../components/ClassDashboard';
import ClassStudentInfo from '../components/ClassStudentsInfo';

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
          <SignupPage />
        </Route>
        <Route path="/forget-password" exact>
          <ForgetPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <Route path="/create-course" exact>
          <CreateCourseForm />
        </Route>
        <Route path="/courses/:courseId" exact>
          <CoursePage />
        </Route>
        <Route path="/dashboard/class/:classId" exact>
          <ClassDashboard />
        </Route>
        <Route path="/class/:courseId/students" exact>
          <ClassStudentInfo></ClassStudentInfo>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
