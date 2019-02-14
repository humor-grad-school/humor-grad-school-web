import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import PostViewPage from './components/PostViewPage';

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/postView" component={PostViewPage} />
      </Switch>
    </Router>
  );
}
