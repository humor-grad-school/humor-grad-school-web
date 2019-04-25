import React, { Component, ReactNode, createRef } from 'react';
import styled from 'styled-components';
import LoginActions from '../../GlobalState/ActionAndStates/LoginActions';
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import { GlobalState } from '../../GlobalState/globalState';

enum LoginOverlayStep {
  Login = 'login',
  SignUp = 'signUp',
}

type LoginOverlayProps = {}

type LoginOverlayStates = {
  step: LoginOverlayStep;
}

type OverlayProps = {
  active: 'true' | 'false';
}

const Overlay = styled.div`
  position: fixed;
  display: ${(props: OverlayProps) => ((props.active === 'true') ? 'fixed' : 'none')};
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
  padding: 1em;
  max-height: 64ex;
  max-width: 28em;
  height: 80vh;
  width: 80vw;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #FFF;
  position: relative;
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
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
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

    const isSuccess = await LoginActions.login(origin, idToken);

    if (isSuccess) {
      LoginActions.closeOverlay();
      return;
    }

    this.stepTo(LoginOverlayStep.SignUp);
  }

  private async handleSignUp(name: string): Promise<void> {
    const isSuccess = await LoginActions.signUp(this.origin, name, this.idToken);
    if (isSuccess) {
      this.handleLogin(this.origin, this.idToken);

      this.stepTo(LoginOverlayStep.Login);
    }

    console.log(isSuccess);
  }

  private handleOverlayClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const isBackgroundClicked = this.selfRef.current === event.target;
    if (isBackgroundClicked) {
      LoginActions.closeOverlay();
    }
  }

  public render(): ReactNode {
    const { step } = this.state;

    const isActived = this.globalState.loginState.isOverlayActived;

    return (
      <Overlay
        active={isActived ? 'true' : 'false'}
        ref={this.selfRef}
        onClick={this.handleOverlayClick}
      >
        <CloseGuide>오버레이를 닫으려면 배경을 클릭하세요</CloseGuide>
        <Container>
          <LoginComponent
            login={this.handleLogin}
            step={step}
          />
          <SignUpComponent
            signUp={this.handleSignUp}
            goBack={() => { this.stepTo(LoginOverlayStep.Login); }}
            step={step}
          />
        </Container>
      </Overlay>
    );
  }
}
