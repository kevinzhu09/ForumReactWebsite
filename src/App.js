import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './css/App.css';
import Welcome from './pre_login_pages/Welcome'
import MainFeed from './main_pages/MainFeed'
import MyPage from './main_pages/MyPage'
import Liked from './main_pages/Liked'
import Account from './main_pages/Account'
import Register from './pre_login_pages/register/Register'
import ViewPost from './main_pages/ViewPost';
import ViewAuthor from './main_pages/ViewAuthor';

function App() {
  return (
      <Router>
        <Route path='/' component={Welcome} exact/>
        <Route path='/register' component={Register} exact/>
        <Route path='/main-feed' component={MainFeed} exact/>
        <Route path='/my-page' component={MyPage} exact/>
        <Route path='/liked' component={Liked} exact/>
        <Route path='/account' component={Account} exact/>
        <Route path='/posts/:id' component={ViewPost} exact/>
        <Route path='/authors/:id' component={ViewAuthor} exact/>
      </Router>     
  );
}

export default App;
