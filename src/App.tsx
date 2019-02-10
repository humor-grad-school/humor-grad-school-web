import React from 'react';
import logoSvg from './logo.svg';
import './App.css';

export default function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoSvg} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>src/App.tsx</code>
           and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
