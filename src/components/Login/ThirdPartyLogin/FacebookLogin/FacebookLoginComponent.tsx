import React from 'react';
import loadFacebookSdk from './loadFacebookSdk';
import BaseLoginComponent from '../BaseLoginComponent';

declare let FB: any;

export default class FacebookLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'facebook';

  public componentDidMount(): void {
    loadFacebookSdk().then(() => {
      console.log('facebook loaded');
      FB.getLoginStatus((response: any) => {
        console.log(response);
        if (response.status === 'connected') {
          this.onThirdPartyLoginSuccessful({
            idToken: response.authResponse.accessToken,
          });
        } else {
          console.error(response);
          this.onThirdPartyLoginFailed();
        }
      });
    });
  }

  public render(): JSX.Element {
    return (
      <div
        className="fb-login-button"
        data-max-rows="1"
        data-size="large"
        data-button-type="continue_with"
        data-show-faces="false"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      />
    );
  }
}
