import React from 'react';
import BaseLoginComponent from '../BaseLoginComponent';
import LoginButton from '../LoginButton';
import LoginActions from '../../../../GlobalState/ActionAndStates/LoginActions';

export default class DevelopLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'local';

  public componentDidMount(): void {
    this.isSdkLoaded = true;
    LoginActions.setThirdPartyLogoutFunction(this.origin, this.logout.bind(this));
  }

  public handleLoginButtonClick(): void {
    this.onThirdPartyLoginSuccessful({ idToken: 'daff204a-079f-4a6d-96aa-2csdf3s5d85' });
    this.login();
  }

  public logout(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished || !this.isLoginSuccessful) {
      return;
    }

    this.isLoginFinished = false;

    this.onThirdPartyLogout();
  }

  public render(): JSX.Element {
    return (
      <LoginButton
        text="develop login"
        Logo={() => <></>}
        onClick={() => { this.handleLoginButtonClick(); }}
      />
    );
  }
}
