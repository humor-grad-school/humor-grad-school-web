import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

type SignUpComponentProps = {
  signUp: (username: string) => void;
  goBack: () => void;
  isActive: 'true' | 'false';
}

type SignUpComponentStates = {
  username: string;
}

type ContainerProps = {
  isActive: 'true' | 'false';
}

const Container = styled.div`
  text-align: center;
  display: ${(props: ContainerProps) => (props.isActive === 'true' ? 'block' : 'none')};
`;

const GoBackButton = styled.button`
  display: block;
  border: 4px solid #DDD;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0);
  color: #999;
  padding: 0.25em 0.5em;
  margin-bottom: 1em;
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
  font-size: 15px;
`;

const NicknameButton = styled.button`
  display: inline-block;
  border: 4px solid #DDD;
  border-radius: 0px 4px 4px 0px;
  padding: 0.5em;
  font-size: 14px;
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
          돌아가기
        </GoBackButton>
        <Title>처음이시군요? 이름을 지어주세요!</Title>
        <NicknameInput
          type="text"
          onChange={this.handleUsernameChange}
          placeholder="[여기에 닉네임을 입력]"
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
