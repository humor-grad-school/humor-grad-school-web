import React from 'react';
import styled from 'styled-components';
import DevelopLoginComponent from './ThirdPartyLogin/DevelopLogin/DevelopLoginComponent';
import FacebookLoginComponent from './ThirdPartyLogin/FacebookLogin/FacebookLoginComponent';
import GoogleLoginComponent from './ThirdPartyLogin/GoogleLogin/GoogleLoginComponent';
import KakaoLoginComponent from './ThirdPartyLogin/KakaoLogin/KakaoLoginComponent';

type LoginComponentProps = {
  step: 'login' | 'signUp';
  login: (origin: string, token: string) => Promise<void>;
}

type ContainerProps = {
  step: 'login' | 'signUp';
}

const Container = styled.div`
  top: 50%;
  position: absolute;
  padding: 1em;
  width: calc(100% - 2em);
  right: ${(props: ContainerProps) => ((props.step === 'login') ? '0px' : '100%')};
  transform: translateY(-50%);
  transition: right 0.5s;
  text-align: center;
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

export default function LoginComponent(props: LoginComponentProps): JSX.Element {
  const {
    step,
    login,
  } = props;

  return (
    <Container step={step}>
      <Title>소셜 계정으로 로그인하세요!</Title>
      <LoginButtonContainer><DevelopLoginComponent login={login} /></LoginButtonContainer>
      <LoginButtonContainer><FacebookLoginComponent login={login} /></LoginButtonContainer>
      <LoginButtonContainer><GoogleLoginComponent login={login} /></LoginButtonContainer>
      <LoginButtonContainer><KakaoLoginComponent login={login} /></LoginButtonContainer>
    </Container>
  );
}
