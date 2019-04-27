import React from 'react';
import styled from 'styled-components';
import loadGoogleSdk from './loadGoogleSdk';
import BaseLoginComponent from '../BaseLoginComponent';

declare let gapi: any;

const GoogleLoginButton = styled.div`
  display: inline-block;
  width: 222px;
  height: 49px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #EEE;
  color: #000;
  line-height: 49px;
`;

export default class GoogleLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'google';

  public loginButtonElementId = 'google-login-btn';

  public componentDidMount(): void {
    loadGoogleSdk().then(async () => {
      console.log('google loaded');
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.attachClickHandler(
        document.getElementById(this.loginButtonElementId),
        {},
        (googleUser: any) => {
          this.onThirdPartyLoginSuccessful({
            idToken: googleUser.getAuthResponse().id_token,
          });
          this.login();
        },
        (error: any) => {
          console.warn(error);
          this.onThirdPartyLoginFailed();
        },
      );
    });
  }

  public render(): JSX.Element {
    return (
      <GoogleLoginButton id={`${this.loginButtonElementId}`}>
        구글계정으로 로그인
      </GoogleLoginButton>
    );
  }
}
