import React, { Component, ReactNode, createRef } from 'react';
import styled from 'styled-components';
import LoginActions from '../../GlobalState/ActionAndStates/LoginActions';
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import { GlobalState } from '../../GlobalState/globalState';

type LoginOverlayProps = {}

type LoginOverlayStates = {
  step: 'login' | 'signUp';
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
      step: 'login',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  private async handleLogin(origin: string, idToken: string): Promise<void> {
    this.origin = origin;
    this.idToken = idToken;

    const isSuccess = await LoginActions.login(origin, idToken);

    if (isSuccess) {
      LoginActions.closeOverlay();
      return;
    }

    this.setState({
      step: 'signUp',
    });
  }

  private async handleSignUp(name: string): Promise<void> {
    const isSuccess = await LoginActions.signUp(this.origin, name, this.idToken);
    if (isSuccess) {
      this.handleLogin(this.origin, this.idToken);

      this.setState({
        step: 'login',
      });
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
        <div>sex</div>
        <Container>
          <LoginComponent
            login={this.handleLogin}
            step={step}
          />
          <SignUpComponent
            signUp={this.handleSignUp}
            step={step}
          />
        </Container>
      </Overlay>
    );
  }
}
