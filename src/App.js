import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignIn from './pre_login_pages/sign_in/SignIn';
import MainFeed from './main_pages/MainFeed';
import MyPage from './main_pages/MyPage';
import Liked from './main_pages/Liked';
import Account from './main_pages/Account';
import Register from './pre_login_pages/register/Register';
import ViewPost from './main_pages/ViewPost';
import ViewAuthor from './main_pages/ViewAuthor';
import Verification from './pre_login_pages/verification/Verification';
import PasswordReset from './pre_login_pages/password-reset/PasswordReset';
import PasswordResetConfirm from './pre_login_pages/password-reset-confirm/PasswordResetConfirm';
import CreatePost from './main_pages/CreatePost';
import EditPost from './main_pages/EditPost';
import SessionExpired from './pre_login_pages/other/SessionExpired';
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';
import LoggedIn from './pre_login_pages/google/LoggedIn';



class App extends React.Component {

  render() {   
    return (
      <Router>

        <Route path='/sign-in' component={SignIn} exact/>
        <Route path='/register' component={Register} exact/>
        <Route path='/verify' component={Verification} exact/>
        <Route path='/main-feed' component={MainFeed} exact/>
        <Route path='/' component={MainFeed} exact/>
        <Route path='/my-page' component={MyPage} exact/>
        <Route path='/liked' component={Liked} exact/>
        <Route path='/account' component={Account} exact/>
        <Route path='/create-post' component={CreatePost} exact/>
        <Route path='/edit-post/:id' component={EditPost} exact/>
        <Route path='/posts/:id' component={ViewPost} exact/>
        <Route path='/authors/:id' component={ViewAuthor} exact/>
        <Route path='/password/reset' component={PasswordReset} exact/>
        <Route path='/password/reset/confirm' component={PasswordResetConfirm} exact/>
        <Route path='/session-expired' component={SessionExpired} exact/>
        <Route path='/error-page' component={ErrorPage} exact/>
        <Route path='/not-found' component={NotFound} exact/>
        <Route path='/logged-in' component={LoggedIn} exact/>


      </Router>     
  ); 
  }
}

export default App;
