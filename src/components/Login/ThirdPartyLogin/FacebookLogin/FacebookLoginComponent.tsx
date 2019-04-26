import React from 'react';
import styled from 'styled-components';
import loadFacebookSdk from './loadFacebookSdk';
import BaseLoginComponent from '../BaseLoginComponent';

declare let FB: any;

const FacebookLoginButton = styled.div`
  display: inline-block;
  width: 222px;
  height: 49px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #3b5998;
  color: #FFF;
  line-height: 49px;
`;

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
        페이스북계정으로 로그인
      </FacebookLoginButton>
    );
  }
}
