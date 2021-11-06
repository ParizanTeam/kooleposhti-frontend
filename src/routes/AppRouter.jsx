import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import NotFoundPage from '../components/NotFoundPage';
import EmailVerification from '../components/EmailVerification';
import ForgetPasswordPage from '../components/ForgetPasswordPage';
import ResetPasswordPage from '../components/ResetPasswordPage';
import TeacherDashboard from '../components/TeacherDashboard';
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
        <Route path="/dashboard" exact>
          <Redirect to="/dashboard/profile" />
        </Route>
        <Route path="/dashboard/">
          <TeacherDashboard />
        </Route>
        <Route path="/forget-password" exact>
          <ForgetPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
