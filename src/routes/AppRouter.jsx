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
import TeacherDashboard from '../components/TeacherDashboard';
import StudentDashboardClassesList from '../components/StudentDashboardClassesList';
import StudentDashboardBookMarkedClasses from '../components/StudentDashboardBookMarkedClasses';
import { Redirect } from 'react-router';
import StudentProfile from '../components/StudentProfile';
import StudentDashboardAssignments from '../components/StudentDashboardAssignments';
import StudentAssignments from '../components/StudentAssignments';
import StudentAssignmentslist from '../components/StudentAssignmentslist';
import StudentProfileCard from '../components/StudentProfileCard';
import TeacherPublicProfile from '../components/TeacherPublicProfile';
import { history } from '../utils/constants';
import Filters from '../components/Filters';
import BaseAssignments from '../components/BaseAssignments';
import NewNotFoundPage from '../components/NewNotFoundPage';
import StudentCoins from '../components/StudentCoins';
import {StudentPrivateRoute} from './PrivateRoute'

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/public-profile/teacher/:username">
          <TeacherPublicProfile />
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
        <Route path="/create-course" exact>
          <CreateCourseForm />
        </Route>
        <Route path="/courses/:courseId" exact>
          <CoursePage />
        </Route>
        <Route path="/dashboard/class/:classId">
          <ClassDashboard />
        </Route>
        <Route path="/class/:courseId/students" exact>
          <ClassStudentInfo></ClassStudentInfo>
        </Route>
        <Route path="/edit-course/:courseId">
          <CreateCourseForm edit />
        </Route>
        <Route path="/:studentUsername/student-profile">
          <StudentProfileCard />
        </Route>
        <Route path="/classes">
          <Filters />
        </Route>
        {/* student dasgboard classes url */}
        <Switch>
          <StudentPrivateRoute path="/dashboard/student/ClassesList" exact>
            <StudentDashboardClassesList />
          </StudentPrivateRoute>
          <StudentPrivateRoute path="/dashboard/student/bookmarks" exact>
            <StudentDashboardBookMarkedClasses />
          </StudentPrivateRoute>
          <StudentPrivateRoute path="/dashboard/student/" exact>
            <Redirect to="/dashboard/student/profile" />
          </StudentPrivateRoute>
          <StudentPrivateRoute path="/dashboard/student/assignments" exact>
            <StudentDashboardAssignments />
          </StudentPrivateRoute>
          <StudentPrivateRoute path="/dashboard/student/profile">
            <StudentProfile />
          </StudentPrivateRoute>
          <StudentPrivateRoute path="/Student/CourseAssignmentsList">
            <StudentAssignmentslist />
          </StudentPrivateRoute>
          <StudentPrivateRoute path="/Student/CourseAssignments">
            <StudentAssignments />
          </StudentPrivateRoute>
          <StudentPrivateRoute path="/dashboard/student/Coins" exact>
            <StudentCoins />
          </StudentPrivateRoute>


          <Route path="/dashboard/class/:courseId/assignments/view/:assignmentId">
          <BaseAssignments />
          </Route>
          <Route path="*">
            <NewNotFoundPage />
          </Route>
        </Switch>
        {/* end student dasgboard classes url */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
