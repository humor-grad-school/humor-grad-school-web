import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HgsRestApi } from './generated/client/ClientApis';
import { setFetchFunction, setDefaultServerUrl } from './generated/graphqlQuery';
import LoginActions from './GlobalState/ActionAndStates/LoginActions';

HgsRestApi.setBaseServerUrl('http://localhost:8080');
HgsRestApi.setIsDevelopment(true);
setFetchFunction(fetch);
setDefaultServerUrl('http://localhost:8080/graphql');

LoginActions.loginFromLocalStorage();

ReactDOM.render(<App />, document.getElementById('root'));
