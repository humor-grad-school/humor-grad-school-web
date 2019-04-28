import React from 'react';
import loadKakaoSdk from './loadKakaoSdk';
import BaseLoginComponent from '../BaseLoginComponent';
import LoginButton from '../LoginButton';
import LoginActions from '../../../../GlobalState/ActionAndStates/LoginActions';

declare let Kakao: any;

const KakaoLogo = (): JSX.Element => (
  <img
    width="30px"
    src="/kakao_logo.png"
    alt=""
  />
);

export default class KakaoLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'kakao';

  public componentDidMount(): void {
    loadKakaoSdk().then(() => {
      console.log('kakao loaded');
      this.isSdkLoaded = true;
      LoginActions.setThirdPartyLogoutFunction(this.origin, this.logout);
    });
  }

  public handleLoginButtonClick(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished) return;

    this.isLoginFinished = false;

    Kakao.Auth.login({
      success: (authObject: any) => {
        const {
          access_token: accessToken,
        } = authObject;
        // {
        //   access_token: "...",
        //   refresh_token: "...",
        //   token_type: "bearer",
        //   expires_in: 43199,
        //   scope: "Basic_Profile",
        // }
        // Remember, Kakao is Oauth 2.0 but works like openId
        this.onThirdPartyLoginSuccessful({
          idToken: accessToken,
        });
        this.login();
      },
      fail: (error: any) => {
        console.error(error);
        this.onThirdPartyLoginFailed();
      },
    });
  }

  public logout(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished) return;

    this.isLoginFinished = false;

    Kakao.Auth.logout(() => {
      this.onThirdPartyLogout();
    });
  }

  public render(): JSX.Element {
    return (
      <LoginButton
        text="카카오계정으로 로그인"
        Logo={KakaoLogo}
        color="#3c1e1e"
        onClick={() => { this.handleLoginButtonClick(); }}
        fontWeight="600"
        backgroundColor="#ffeb00"
      />
    );
  }
}
