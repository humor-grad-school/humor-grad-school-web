import React from 'react';
import loadGoogleSdk from './loadGoogleSdk';
import BaseLoginComponent from '../BaseLoginComponent';
import LoginButton from '../LoginButton';
import LoginActions from '../../../../GlobalState/ActionAndStates/LoginActions';
import googleLogoSvg from '../../../../svg/google_logo.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let gapi: any;

const GoogleLogo = (): JSX.Element => (
  <img
    src={googleLogoSvg}
    alt=""
    width="18px"
    height="18px"
  />
);

export default class GoogleLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'google';

  public loginButtonElementId = 'google-login-btn';

  public componentDidMount(): void {
    loadGoogleSdk().then(async () => {
      this.isSdkLoaded = true;
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.attachClickHandler(
        document.getElementById(this.loginButtonElementId),
        {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (googleUser: any) => {
          this.onThirdPartyLoginSuccessful({
            idToken: googleUser.getAuthResponse().id_token,
          });
          this.login();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
          console.error(error);
          this.onThirdPartyLoginFailed();
        },
      );
      LoginActions.setThirdPartyLogoutFunction(this.origin, this.logout.bind(this));
    });
  }

  public logout(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished || !this.isLoginSuccessful) {
      return;
    }

    this.isLoginFinished = false;

    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(() => {
        this.onThirdPartyLogout();
      });
  }

  public render(): JSX.Element {
    return (
      <LoginButton
        id={this.loginButtonElementId}
        text="구글계정으로 로그인"
        Logo={GoogleLogo}
        backgroundColor="#4285F4"
        logoBackgroundColor="#FFF"
      />
    );
  }
}
