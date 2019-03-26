import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import PostViewPage from './components/PostView/PostViewPage';
import PostWritePage from './components/PostWrite/PostWritePage';

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/post/:postId" component={PostViewPage} />
        <Route path="/writePost" component={PostWritePage} />
      </Switch>
    </Router>
  );
}
