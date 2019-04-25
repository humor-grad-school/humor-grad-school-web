import { Component } from 'react';

type AuthenticationRequestData = {
  idToken: string;
}

type BaseLoginComponentProps = {
  login: (origin: string, idToken: string) => Promise<void>;
}

export default abstract class BaseLoginComponent<T, U>
  extends Component<BaseLoginComponentProps & T, U> {
  protected onThirdPartyLoginSuccessful(
    authenticationRequestData: AuthenticationRequestData,
  ): void {
    const {
      login,
    } = this.props;

    const {
      idToken,
    } = authenticationRequestData;

    login(
      this.origin,
      idToken,
    );
  }

  protected onThirdPartyLoginFailed(): void {
    alert(`${this.origin}인증에 실패했어요... 시간 있으시면 다시 해볼래요?`);
  }

  abstract get origin(): string;
}
