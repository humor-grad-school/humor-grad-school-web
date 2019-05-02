import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

type SignUpComponentProps = {
  signUp: (username: string) => void;
  goBack: () => void;
  isActive: boolean;
}

type SignUpComponentStates = {
  username: string;
}

type ContainerProps = {
  isActive: boolean;
}

const Container = styled.div`
  text-align: center;
  display: ${(props: ContainerProps) => (props.isActive ? 'block' : 'none')};
`;

const GoBackButton = styled.button`
  position: absolute;
  left: 0px;
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

const Title = styled.div`
  font-size: 1.5em;
  margin-bottom: 4em;
`;

const NicknameInput = styled.input`
  display: inline-block;
  border: 4px solid #DDD;
  border-radius: 4px 0px 0px 4px;
  padding: 0.5em;
  vertical-align: middle;
  font-family: inherit;
`;

const NicknameButton = styled.button`
  display: inline-block;
  border: 4px solid #DDD;
  border-radius: 0px 4px 4px 0px;
  padding: 0.5em;
  cursor: pointer;
  color: #777;
  vertical-align: middle;
  font-family: inherit;
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

  private handleSignUp(): void {
    const { signUp } = this.props;
    const { username } = this.state;
    signUp(username);
  }

  public render(): ReactNode {
    const {
      goBack,
      isActive,
    } = this.props;

    return (
      <Container isActive={isActive}>
        <GoBackButton
          type="button"
          onClick={goBack}
        >
          {'<'}
        </GoBackButton>
        <Title>처음이시군요? 이름을 지어주세요!</Title>
        <NicknameInput
          type="text"
          onChange={this.handleUsernameChange}
          placeholder="[여기에 닉네임을 입력]"
          onKeyUp={(event) => { if (event.key === 'Enter') this.handleSignUp(); }}
        />
        <NicknameButton
          type="button"
          onClick={this.handleSignUp}
        >
          확인
        </NicknameButton>
      </Container>
    );
  }
}
