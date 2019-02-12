import React from 'react';
import Feeds from './Feeds';
import './MainPage.css';

export default function MainPage(): JSX.Element {
  return (
    <div className="flex-container">
      <Feeds />
      <Feeds />
    </div>
  );
}
