import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import MainFeed from './MainFeed'
import MyPage from './MyPage'
import Bookmarked from './Bookmarked'
import Account from './Account'

function App() {
  return (
      <Router>
        <Route path='/' component={MainFeed} exact/>
        <Route path='/my-page' component={MyPage} exact/>
        <Route path='/bookmarked' component={Bookmarked} exact/>
        <Route path='/account' component={Account} exact/>
      </Router>     
  );
}

export default App;
