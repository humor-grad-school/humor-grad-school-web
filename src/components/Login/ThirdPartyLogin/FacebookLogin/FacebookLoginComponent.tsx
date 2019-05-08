import React from 'react';
import loadFacebookSdk from './loadFacebookSdk';
import BaseLoginComponent from '../BaseLoginComponent';
import LoginButton from '../LoginButton';
import LoginActions from '../../../../GlobalState/ActionAndStates/LoginActions';
import facebookLogoSvg from '../../../../svg/facebook_logo.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let FB: any;

const FacebookLogo = (): JSX.Element => (
  <img
    src={facebookLogoSvg}
    alt=""
    width="25px"
    height="25px"
  />
);

export default class FacebookLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'facebook';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      this.isSdkLoaded = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      FB.getLoginStatus((response: any) => {
        this.handleLoginResponse(response);
      });
      LoginActions.setThirdPartyLogoutFunction(this.origin, this.logout.bind(this));
    });
  }

  public handleLoginButtonClick(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished) {
      return;
    }

    this.isLoginFinished = false;

    if (this.isLoginSuccessful) {
      this.isLoginFinished = true;
      this.login();
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FB.login((response: any) => {
      this.handleLoginResponse(response);

      if (!this.isLoginFinished || !this.isLoginSuccessful) {
        return;
      }

      this.login();
    });
  }

  public logout(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished || !this.isLoginSuccessful) {
      return;
    }

    this.isLoginFinished = false;

    FB.logout(() => {
      this.onThirdPartyLogout();
    });
  }

  public render(): JSX.Element {
    return (
      <LoginButton
        text="페이스북계정으로 로그인"
        Logo={FacebookLogo}
        onClick={() => { this.handleLoginButtonClick(); }}
        backgroundColor="#3b5998"
      />
    );
  }
}
