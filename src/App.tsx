import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import PostViewPage from './components/PostView/PostViewPage';
import PostWritePage from './components/PostWrite/PostWritePage';
import BoardViewPage from './components/BoardView/BoardViewPage';
import LoginOverlay from './components/Login/LoginOverlay';
import TopNavigationBarComponent from './components/TopNavigationBar/TopNavigationBarComponent';

export default function App(): JSX.Element {
  return (
    <Router>
      <>
        <LoginOverlay />
        <TopNavigationBarComponent />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/post/:postId" component={PostViewPage} />
          <Route path="/writePost/:boardName" component={PostWritePage} />
          <Route path="/board/:boardName/:pageNum?" component={BoardViewPage} />
        </Switch>
      </>
    </Router>
  );
}
