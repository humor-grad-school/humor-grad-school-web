import React from 'react';
import styled from 'styled-components';
import HomeButton from './HomeButton';
import LoginButtonComponent from './LoginButton';
import DropDownMenu from './DropDownMenu';

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
      <DropDownMenu
        name="유머"
        items={[
          { name: '글 읽기', linkTo: '/board/humor' },
          { name: '글 읽기읽 글', linkTo: '/board/humor' },
          { name: '글 읽기읽 글 읽기읽 글', linkTo: '/board/humor' },
          { name: '글 읽기읽 글 읽기읽 글 읽기읽 글', linkTo: '/board/humor' },
        ]}
      />
      <DropDownMenu
        name="유우머"
        items={[
          { name: '글 읽기', linkTo: '/board/humor' },
          { name: '글 쓰기', linkTo: '/writePost/humor' },
        ]}
      />
      <LoginButtonComponent />
    </Container>
  );
}
