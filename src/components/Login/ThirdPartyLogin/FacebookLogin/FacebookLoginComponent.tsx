import React from 'react';
import styled from 'styled-components';
import loadFacebookSdk from './loadFacebookSdk';
import BaseLoginComponent from '../BaseLoginComponent';

declare let FB: any;

// const FacebookLoginButton = styled.div`
//   display: inline-block;
//   width: 222px;
//   height: 49px;
//   border-radius: 4px;
//   cursor: pointer;
//   background-color: #3b5998;
//   color: #FFF;
//   line-height: 49px;
// `;

const FacebookLoginButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  width: 204px;
  height: 40px;
  padding: 0px 8px;
  background-color: #3b5998;
  color: #FFF;
  font-size: 14px;
  font-weight: 500;
  font-family: "Roboto";
  line-height: 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  width: 25px;
  height: 25px;
`;

const FacebookLogo = () => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    width="25px"
    height="25px"
    viewBox="0 0 58 58"
  >
    <title>flogo-HexRBG-Wht-58</title>
    <path fill="#fff" d="M53.85,0H3.15A3.15,3.15,0,0,0,0,3.15v50.7A3.15,3.15,0,0,0,3.15,57h27.3V35H23V26.33h7.41V20c0-7.37,4.49-11.38,11.06-11.38A62.15,62.15,0,0,1,48.15,9v7.69H43.61c-3.57,0-4.26,1.69-4.26,4.18v5.5H47.9L46.79,35H39.35V57h14.5A3.15,3.15,0,0,0,57,53.85V3.15A3.15,3.15,0,0,0,53.85,0Z" />
  </svg>
);

export default class FacebookLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'facebook';

  public isSdkLoaded: boolean = false;

  private handleLoginResponse(response: any): void {
    switch (response.status) {
      case 'connected': {
        this.onThirdPartyLoginSuccessful({
          idToken: response.authResponse.accessToken,
        });
        break;
      }

      case 'not_authorized':
      case 'unknown': {
        this.onThirdPartyLoginFailed();
        break;
      }

      default: {
        this.onThirdPartyLoginFailed();
        throw new Error(response);
      }
    }
  }

  public componentDidMount(): void {
    loadFacebookSdk().then(() => {
      console.log('facebook loaded');
      this.isSdkLoaded = true;
      FB.getLoginStatus((response: any) => {
        this.handleLoginResponse(response);
      });
    });
  }

  public handleLoginButtonClick(): void {
    if (!this.isSdkLoaded) return;

    if (!this.isLoginFinished) return;

    if (this.isLoginSuccessful) {
      this.login();
      return;
    }

    FB.login((response: any) => {
      this.handleLoginResponse(response);

      if (!(this.isLoginFinished && this.isLoginSuccessful)) return;

      this.login();
    });
  }

  public render(): JSX.Element {
    return (
      <FacebookLoginButton
        onClick={() => { this.handleLoginButtonClick(); }}
      >
        <LogoContainer><FacebookLogo /></LogoContainer>
        페이스북계정으로 로그인
      </FacebookLoginButton>
    );
  }
}
