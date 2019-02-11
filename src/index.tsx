import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ErrorCode } from './generated/ErrorCode';

console.log(ErrorCode.DefaultErrorCode.InternalServerError);

ReactDOM.render(<App />, document.getElementById('root'));
