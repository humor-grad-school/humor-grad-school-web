import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import DevelopLoginComponent from './ThirdPartyLogin/DevelopLogin/DevelopLoginComponent';
import FacebookLoginComponent from './ThirdPartyLogin/FacebookLogin/FacebookLoginComponent';
import GoogleLoginComponent from './ThirdPartyLogin/GoogleLogin/GoogleLoginComponent';
import KakaoLoginComponent from './ThirdPartyLogin/KakaoLogin/KakaoLoginComponent';

type LoginComponentProps = {
  login: (origin: string, token: string) => Promise<void>;
  autoLogin: boolean;
  onAutoLoginChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
}

type ContainerProps = {
  isActive: boolean;
}

const Container = styled.div`
  text-align: center;
  display: ${(props: ContainerProps) => (props.isActive ? 'block' : 'none')};
`;

const Title = styled.div`
  font-size: 1.5em;
  margin-bottom: 4em;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  & + & {
    margin-top: 0.5ex;
  }
`;

const AutoLoginContainer = styled.div`
  margin-top: 2em;
`;

const AutoLoginCheckBox = styled.input`
  cursor: pointer;
  vertical-align: text-bottom;
`;

export default function LoginComponent(props: LoginComponentProps): JSX.Element {
  const {
    login,
    autoLogin,
    onAutoLoginChange,
    isActive,
  } = props;

  return (
    <Container isActive={isActive}>
      <Title>소셜 계정으로 로그인하세요!</Title>
      <LoginButtonContainer><DevelopLoginComponent login={login} /></LoginButtonContainer>
      <LoginButtonContainer><FacebookLoginComponent login={login} /></LoginButtonContainer>
      <LoginButtonContainer><GoogleLoginComponent login={login} /></LoginButtonContainer>
      <LoginButtonContainer><KakaoLoginComponent login={login} /></LoginButtonContainer>
      <AutoLoginContainer>
        자동으로 로그인할래요?
        <AutoLoginCheckBox
          type="checkbox"
          checked={autoLogin}
          onChange={onAutoLoginChange}
        />
      </AutoLoginContainer>
    </Container>
  );
}
