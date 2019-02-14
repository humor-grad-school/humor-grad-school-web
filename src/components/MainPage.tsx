import React from 'react';
import Feeds from './Feeds';
import './MainPage.scss';

export default function MainPage(): JSX.Element {
  return (
    <div className="main-page flex-container">
      <Feeds />
      <Feeds />
    </div>
  );
}
