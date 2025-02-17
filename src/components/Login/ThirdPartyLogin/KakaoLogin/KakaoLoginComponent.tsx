import React from 'react';
import loadKakaoSdk from './loadKakaoSdk';
import BaseLoginComponent from '../BaseLoginComponent';
import LoginButton from '../LoginButton';
import LoginActions from '../../../../GlobalState/ActionAndStates/LoginActions';
import kakaoLogoSvg from '../../../../svg/kakao_logo.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Kakao: any;

const KakaoLogo = (): JSX.Element => (
  <img
    src={kakaoLogoSvg}
    alt=""
    width="25px"
  />
);

export default class KakaoLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'kakao';

  public componentDidMount(): void {
    loadKakaoSdk().then(() => {
      this.isSdkLoaded = true;
      LoginActions.setThirdPartyLogoutFunction(this.origin, this.logout.bind(this));
    });
  }

  public handleLoginButtonClick(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished) {
      return;
    }

    this.isLoginFinished = false;

    Kakao.Auth.login({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fail: (error: any) => {
        console.error(error);
        this.onThirdPartyLoginFailed();
      },
    });
  }

  public logout(): void {
    if (!this.isSdkLoaded || !this.isLoginFinished || !this.isLoginSuccessful) {
      return;
    }

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
