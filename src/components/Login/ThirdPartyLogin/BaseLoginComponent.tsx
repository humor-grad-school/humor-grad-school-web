import { Component } from 'react';

type AuthenticationRequestData = {
  idToken: string;
}

type BaseLoginComponentProps = {
  login: (origin: string, idToken: string) => Promise<void>;
}

export default abstract class BaseLoginComponent<T, U>
  extends Component<BaseLoginComponentProps & T, U> {
  public isLoginFinished: boolean = true;

  public isLoginSuccessful: boolean = false;

  public isSdkLoaded: boolean = false;

  private authenticationRequestData: AuthenticationRequestData = { idToken: '' };

  protected onThirdPartyLoginSuccessful(
    authenticationRequestData: AuthenticationRequestData,
  ): void {
    this.authenticationRequestData = authenticationRequestData;
    this.isLoginFinished = true;
    this.isLoginSuccessful = true;
  }

  protected onThirdPartyLoginFailed(): void {
    this.isLoginFinished = true;
    this.isLoginSuccessful = false;
  }

  protected onThirdPartyLogout(): void {
    this.isLoginFinished = true;
    this.isLoginSuccessful = false;
    this.authenticationRequestData = { idToken: '' };
  }

  abstract get origin(): string;

  public abstract logout(): void;

  protected login(): void {
    if (!(this.isLoginFinished && this.isLoginSuccessful)) {
      console.warn('Third party login was not successful. Call this after success');
      return;
    }

    const {
      login,
    } = this.props;

    const {
      idToken,
    } = this.authenticationRequestData;

    login(
      this.origin,
      idToken,
    );
  }
}
