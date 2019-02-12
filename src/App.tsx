import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MainPage from './pages/MainPage';

export default function App(): JSX.Element {
  return (
    <Router>
      <Route path="/" component={MainPage} />
    </Router>
  );
}
