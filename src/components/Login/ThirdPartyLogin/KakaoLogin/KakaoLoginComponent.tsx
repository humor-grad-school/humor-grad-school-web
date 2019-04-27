import React from 'react';
import styled from 'styled-components';
import loadKakaoSdk from './loadKakaoSdk';
import BaseLoginComponent from '../BaseLoginComponent';

declare let Kakao: any;

const KakaoLoginButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  width: 204px;
  height: 40px;
  padding: 0px 8px;
  background-color: #ffeb00;
  color: #3c1e1e;
  font-size: 14px;
  font-weight: 600;
  font-family: "Roboto";
  line-height: 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  width: 25px;
  height: 25px;
`;

const Logo = styled.img`
  width: 30px;
`;

export default class KakaoLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'kakao';

  public isSdkLoaded: boolean = false;

  public componentDidMount(): void {
    loadKakaoSdk().then(() => {
      console.log('kakao loaded');
      this.isSdkLoaded = true;
    });
  }

  public handleLoginButtonClick(): void {
    if (!this.isSdkLoaded) return;

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

  public render(): JSX.Element {
    return (
      <KakaoLoginButton onClick={() => { this.handleLoginButtonClick(); }}>
        <LogoContainer>
          <Logo
            src="/kakao_logo.png"
            alt=""
          />
        </LogoContainer>
        카카오계정으로 로그인
      </KakaoLoginButton>
    );
  }
}
