import React, { Component } from 'react';
import styled from 'styled-components';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import LoginActions from '../../GlobalState/ActionAndStates/LoginActions';

const Container = styled.div`
  margin-left: auto;
  margin-right: 16px;
  display: block;
`;

const StyledButton = styled.button`
  height: 40px;
  line-height: 40px;
  padding: 0px 16px;
  border-radius: 40px;
  color: #FFF;
  border: 0px;
  background-color: #777;
  transition: background-color 0.25s;
  cursor: pointer;

  &:hover {
    background-color: #888;
  }
`;

function LogoutButton(): JSX.Element {
  return (
    <StyledButton
      type="button"
      onClick={() => { LoginActions.logout(); }}
    >
      로그아웃
    </StyledButton>
  );
}

function LoginButton(): JSX.Element {
  return (
    <StyledButton
      type="button"
      onClick={() => { LoginActions.openOverlay(); }}
    >
      로그인
    </StyledButton>
  );
}

export default class LoginButtonComponent extends Component<{}, {}> {
  private globalState = getGlobalStateForReactComponent(this);

  public render(): JSX.Element {
    const { isLoggedIn } = this.globalState.loginState;

    return (
      <Container>
        {
          isLoggedIn
            ? <LogoutButton />
            : <LoginButton />
        }
      </Container>
    );
  }
}
