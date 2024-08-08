import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import { authToken } from './views/plugins/api';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const ChangePassword = React.lazy(() => import('./views/coursecamp/dashboard/changePassword'));
const CourseDashboard = React.lazy(() => import('./views/coursecamp/dashboard/index'));
const SearchCourse = React.lazy(() => import('./views/coursecamp/course/searchPage'));
const CategoryCourse = React.lazy(() => import('./views/coursecamp/course/categoryPage'));
const AddCourse = React.lazy(() => import('./views/coursecamp/course/addCourse'));
const DetailCourse = React.lazy(() => import('./views/coursecamp/course/detailCourse'));
const EditCourse = React.lazy(() => import('./views/coursecamp/course/editCourse'));
const Profile = React.lazy(() => import('./views/coursecamp/dashboard/profile'));
const ProfileAdmin = React.lazy(() => import('./views/coursecamp/dashboard/profileAdmin'));
const CourseCamp = React.lazy(() => import('./views/coursecamp/landingpage/index'));
const Login = React.lazy(() => import('./views/coursecamp/landingpage/login'));
const Register = React.lazy(() => import('./views/coursecamp/landingpage/register'));
const Pembelajaran = React.lazy(() => import('./views/coursecamp/course/pembelajaranCourse'));
// const PembelajaranTest = React.lazy(() => import('./views/coursecamp/course/pembelajaranCourseTest'));

class App extends Component {
  render() {

    const token = authToken()
    if (token) {
      const expTime = token.exp;
      const curTime = Math.floor(Date.now() / 1000)
      if (expTime < curTime) {
        localStorage.removeItem("token");
        window.location.reload()
        console.log("token expired")
      }
    }

    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          {token ?
            (
              <Switch>
                <Route exact path="/course-dashboard" name="Dashboard" render={props => <CourseDashboard {...props} />} />
                <Route exact path="/change-password" name="Change Password" render={props => <ChangePassword {...props} />} />
                <Route exact path="/search-course/:keyword" name="Search Course" render={props => <SearchCourse {...props} />} />
                <Route exact path="/category-course/:main_category" name="Search Course by Category" render={props => <CategoryCourse {...props} />} />
                <Route exact path="/add-course" name="Add Course" render={props => <AddCourse {...props} />} />
                <Route exact path="/detail-course/:id" name="Detail Course" render={props => <DetailCourse {...props} />} />
                <Route exact path="/edit-course/:id" name="Edit Course" render={props => <EditCourse {...props} />} />
                <Route exact path="/profile" name="Profile" render={props => <Profile {...props} />} />
                <Route exact path="/profile-admin" name="Profile" render={props => <ProfileAdmin {...props} />} />
                <Route exact path="/course/:id_course/materi/:id_materi" name="Pembelajaran" render={props => <Pembelajaran {...props} />} />
                {/* <Route exact path="/coursetest/:id_course/materi/:id_materi" name="Pembelajaran" render={props => <PembelajaranTest {...props} />} /> */}
                <Route path="/" name="Dashboard">
                  <Redirect to="/course-dashboard" />
                </Route>
              </Switch>
            )
            :
            (
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
                <Route exact path="/" name="Home" render={props => <CourseCamp {...props} />} />
                <Route path="/" name="Home">
                  <Redirect to="/" />
                </Route>
              </Switch>
            )
          }
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
