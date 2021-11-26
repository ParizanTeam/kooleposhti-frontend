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
import ClassSchedule from '../components/ClassSchedule';
import BookMarkedClasses from '../components/BookMarkedClasses';
import { Redirect } from 'react-router';
import StudentProfile from '../components/StudentProfile';
import ClassCalendar from '../components/ClassCalendar';
import StudentAssignments from '../components/StudentAssignments';
import StudentAssignmentslist from '../components/StudentAssignmentslist';

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
        <Route path="/edit-course/:courseId">
          <CreateCourseForm edit />
        </Route>
        {/* student dasgboard classes url */}
        <Switch>
          <Route path="/dashboard/student/schedule" exact>
            <ClassSchedule />
          </Route>
          <Route path="/dashboard/student/bookmarks" exact>
            <BookMarkedClasses />
          </Route>
          <Route path="/dashboard/student/" exact>
            <Redirect to="/dashboard/student/profile" />
          </Route>
          <Route path="/dashboard/student/calendar">
            <ClassCalendar />
          </Route>
          <Route path="/dashboard/student/profile">
            <StudentProfile />
          </Route>
          <Route path="/Student/CourseAssignmentsList">
            <StudentAssignmentslist />
          </Route>
          <Route path="/Student/CourseAssignments">
            <StudentAssignments />
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
