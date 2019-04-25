import React from 'react';
import loadKakaoSdk from './loadKakaoSdk';
import BaseLoginComponent from '../BaseLoginComponent';

declare let Kakao: any;

export default class KakaoLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'kakao';

  public loginButtonElementId = 'kakao-login-btn';

  public componentDidMount(): void {
    loadKakaoSdk().then(() => {
      console.log('kakao loaded');
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: (authObj: any) => {
          const {
            access_token: accessToken,
          } = authObj;
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
        },
        fail: (err: any) => {
          console.error(err);
          this.onThirdPartyLoginFailed();
        },
      });
    });
  }

  public render(): JSX.Element {
    return (
      <div id={`${this.loginButtonElementId}`} />
    );
  }
}
