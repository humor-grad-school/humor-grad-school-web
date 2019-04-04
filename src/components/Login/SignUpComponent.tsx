import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

type SignUpComponentProps = {
  step: 'login' | 'signUp';
  signUp: (username: string) => void;
}

type SignUpComponentStates = {
  username: string;
}

type ContainerProps = {
  step: 'login' | 'signUp';
}

const Container = styled.div`
  top: 50%;
  position: absolute;
  padding: 1em;
  width: calc(100% - 2em);
  left: ${(props: ContainerProps) => ((props.step === 'signUp') ? '0px' : '100%')};
  transform: translateY(-50%);
  transition: left 0.5s;
`;

export default class SignUpComponent
  extends Component<SignUpComponentProps, SignUpComponentStates> {
  public constructor(props: SignUpComponentProps) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  private handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      username: event.target.value,
    });
  }

  private handleSignUp() {
    const { signUp } = this.props;
    const { username } = this.state;
    signUp(username);
  }

  public render(): ReactNode {
    const {
      step,
    } = this.props;

    return (
      <Container step={step}>
        <input
          type="text"
          onChange={this.handleUsernameChange}
          placeholder="[여기에 닉네임을 입력]"
        />
        <button
          type="button"
          onClick={this.handleSignUp}
        >
          확인
        </button>
      </Container>
    );
  }
}
