import React from 'react';
import styled from 'styled-components';
import BoardPageNavigatorComponent from './BoardPageNavigatorComponent';

const Container = styled.div`
  margin: 4em auto;
  display: flex;
  justify-content: center;
`;

export default function BoardPostListFooterComponent(info: {
  boardName: string;
  pageNumber: number;
}): JSX.Element {
  return (
    <Container>
      <BoardPageNavigatorComponent {...info} />
    </Container>
  );
}
