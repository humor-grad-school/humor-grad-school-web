import React from 'react';
import BaseLoginComponent from '../BaseLoginComponent';
import LoginButton from '../LoginButton';

export default class DevelopLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'local';

  public handleLoginButtonClick(): void {
    this.onThirdPartyLoginSuccessful({ idToken: 'daff204a-079f-4a6d-96aa-2csdf3s5d85' });
    this.login();
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
