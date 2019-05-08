import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type PageButtonProps = {
  isCurrentPage: boolean;
}

const Container = styled.div`
  border-radius: 2em;
  background-color: #DDD;

  a {
    text-decoration: none;
    color: #000;
  }
`;

const PageButton = styled(Link)`
  width: 1em;
  height: 1em;
  padding: 1em;
  line-height: 1em;
  text-align: center;
  border-radius: 2em;
  display: inline-block;
  color: ${(props: PageButtonProps) => (props.isCurrentPage ? '#FFF' : '#000')}
  ${(props: PageButtonProps) => (props.isCurrentPage ? 'background-color: #AAA' : '')}
  transition: background-color 0.25s, color 0.25s;

  :hover {
    background-color: #CCC;
  }
`;

export default function BoardPageNavigatorComponent({
  boardName,
  pageNumber,
}: {
  boardName: string;
  pageNumber: number;
}): JSX.Element {
  const start = Math.max(1, (pageNumber - 4));
  const end = pageNumber + 4;

  const pageButtonElements: JSX.Element[] = [];

  for (let i = start; i <= end; i += 1) {
    pageButtonElements.push(
      <PageButton
        isCurrentPage={i === pageNumber}
        key={`board-page-navigator-page-button-${i}`}
        to={`/board/${boardName}/${i}`}
      >
        {i}
      </PageButton>,
    );
  }

  return (
    <Container>
      {pageButtonElements}
    </Container>
  );
}
