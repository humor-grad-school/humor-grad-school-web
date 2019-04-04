import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

type LoginComponentProps = {
  step: 'login' | 'signUp';
  setToken: (origin: string, token: string) => void;
}

type LoginComponentStates = {}

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
`;

export default class LoginComponent extends Component<LoginComponentProps, LoginComponentStates> {
  public constructor(props: LoginComponentProps) {
    super(props);

    this.onDevelopLoginSuccess = this.onDevelopLoginSuccess.bind(this);
  }

  private onDevelopLoginSuccess() {
    const { setToken } = this.props;
    setToken('local', 'daff204a-079f-4a6d-96aa-2csdf3s5d85');
  }

  public render(): ReactNode {
    const {
      step,
    } = this.props;

    return (
      <Container step={step}>
        <button
          type="button"
          onClick={this.onDevelopLoginSuccess}
        >
          develop
        </button>
      </Container>
    );
  }
}
