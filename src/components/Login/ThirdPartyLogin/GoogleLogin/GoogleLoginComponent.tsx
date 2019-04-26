import React from 'react';
import loadGoogleSdk from './loadGoogleSdk';
import BaseLoginComponent from '../BaseLoginComponent';

declare let gapi: any;

export default class GoogleLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'google';

  public loginButtonElementId = 'google-login-btn';

  public componentDidMount(): void {
    loadGoogleSdk().then(() => {
      console.log('google loaded');
      gapi.signin2.render(this.loginButtonElementId, {
        scope: 'profile email',
        width: 222,
        height: 49,
        longtitle: true,
        theme: 'dark',
        onsuccess: (googleUser: any) => {
          this.onThirdPartyLoginSuccessful({
            idToken: googleUser.getAuthResponse().id_token,
          });
          this.login();
        },
        onfailure: (error: any) => {
          console.warn(error);
          this.onThirdPartyLoginFailed();
        },
      });
    });
  }

  public render(): JSX.Element {
    return (
      <div id={this.loginButtonElementId} />
    );
  }
}
