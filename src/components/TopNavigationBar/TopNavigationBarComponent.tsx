import React from 'react';
import styled from 'styled-components';
import HomeButton from './HomeButton';
import LoginButtonComponent from './LoginButton';

const Container = styled.div`
  display: flex;
  width: 100vw;
  background-color: #DDD;
  flex-direction: row;
  align-items: center;
  height: 64px;
`;

export default function TopNavigationBarComponent(): JSX.Element {
  return (
    <Container>
      <HomeButton />
      <LoginButtonComponent />
    </Container>
  );
}
