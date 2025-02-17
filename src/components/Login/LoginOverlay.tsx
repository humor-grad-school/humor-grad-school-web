import React, { Component, ReactNode, createRef } from 'react';
import styled from 'styled-components';
import LoginActions from '../../GlobalState/ActionAndStates/LoginActions';
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import { GlobalState } from '../../GlobalState/globalState';
import { ErrorCode } from '../../generated/ErrorCode';

enum LoginOverlayStep {
  Login = 'login',
  SignUp = 'signUp',
}

type LoginOverlayProps = {}

type LoginOverlayStates = {
  step: LoginOverlayStep;
  autoLogin: boolean;
}

type OverlayProps = {
  isActive: boolean;
}

const Overlay = styled.div`
  position: fixed;
  display: ${(props: OverlayProps) => (props.isActive ? 'fixed' : 'none')};
  width: 100vw;
  height: 100vh;
  z-index: 1;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseGuide = styled.div`
  position: fixed;
  top: 1em;
  left: 50%;
  transform: translateX(-50%);
  color: #FFF;
`;

const Container = styled.div`
  padding: 4em 2em;
  max-height: 80vh;
  max-width: 80vw;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #FFF;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 2em;
  padding: 0px;
  border: 0px;
  background-color: #EEE;
  width: 2ex;
  height: 2ex;
  color: #999;
  cursor: pointer;
`;

export default class LoginOverlay extends Component<LoginOverlayProps, LoginOverlayStates> {
  private selfRef = createRef<HTMLDivElement>();

  private globalState: GlobalState = getGlobalStateForReactComponent(this);

  private origin: string = '';

  private idToken: string = '';

  public constructor(props: LoginOverlayProps) {
    super(props);

    this.state = {
      step: LoginOverlayStep.Login,
      autoLogin: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleAutoLoginChange = this.handleAutoLoginChange.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  private stepTo(step: LoginOverlayStep): void {
    this.setState({
      step,
    });
  }

  private async handleLogin(origin: string, idToken: string): Promise<void> {
    this.origin = origin;
    this.idToken = idToken;

    const { autoLogin } = this.state;

    const response = await LoginActions.login(origin, idToken, autoLogin);

    if (response.isSuccessful) {
      LoginActions.closeOverlay();
      return;
    }

    switch (response.errorCode) {
      case ErrorCode.AuthenticateErrorCode.NoUser: {
        this.stepTo(LoginOverlayStep.SignUp);
        break;
      }

      case ErrorCode.AuthenticateErrorCode.WrongIdentityType: {
        throw new Error(response.errorCode);
      }

      default: {
        alert('로그인에 문제가 생겼어요. 다시 해볼래요?');
        break;
      }
    }
  }

  private async handleSignUp(name: string): Promise<void> {
    const response = await LoginActions.signUp(this.origin, name, this.idToken);
    if (response.isSuccessful) {
      this.handleLogin(this.origin, this.idToken);
      this.stepTo(LoginOverlayStep.Login);

      return;
    }

    switch (response.errorCode) {
      case ErrorCode.SignUpErrorCode.CreateUserFailed: {
        alert('이미 쓰고 있는 이름 같은데... 좀 더 개성 있는 이름은 없나요?');
        break;
      }

      case ErrorCode.SignUpErrorCode.WrongOrigin: {
        throw new Error(response.errorCode);
      }

      default: {
        alert('로그인에 문제가 생겼어요. 다시 해볼래요?');
        this.stepTo(LoginOverlayStep.Login);
      }
    }
  }

  private handleGoBack(): void {
    this.stepTo(LoginOverlayStep.Login);
    LoginActions.logoutThirdParty(this.origin);
  }

  private handleAutoLoginChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      autoLogin: event.target.checked,
    });
  }

  private handleOverlayClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const isBackgroundClicked = this.selfRef.current === event.target;
    if (isBackgroundClicked) {
      LoginActions.closeOverlay();
    }
  }

  public render(): ReactNode {
    const {
      step,
      autoLogin,
    } = this.state;

    const isActived = this.globalState.loginState.isOverlayActived;

    return (
      <Overlay
        isActive={isActived}
        ref={this.selfRef}
        onClick={this.handleOverlayClick}
      >
        <CloseGuide>오버레이를 닫으려면 배경을 클릭하세요</CloseGuide>
        <Container>
          <CloseButton onClick={LoginActions.closeOverlay}>
            X
          </CloseButton>
          <LoginComponent
            login={this.handleLogin}
            autoLogin={autoLogin}
            onAutoLoginChange={this.handleAutoLoginChange}
            isActive={step === LoginOverlayStep.Login}
          />
          <SignUpComponent
            signUp={this.handleSignUp}
            goBack={this.handleGoBack}
            isActive={step === LoginOverlayStep.SignUp}
          />
        </Container>
      </Overlay>
    );
  }
}
