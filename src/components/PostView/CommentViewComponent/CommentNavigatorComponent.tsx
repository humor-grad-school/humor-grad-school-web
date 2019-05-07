import React from 'react';
import styled from 'styled-components';

type PageButtonProps = {
  iscurrentpage: boolean;
}

const Container = styled.div`
  margin: 1em auto;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  border-radius: 2em;
  background-color: #DDD;
`;

const PageButton = styled.button`
  width: 3em;
  height: 3em;
  padding: 1em;
  line-height: 1em;
  text-align: center;
  border-radius: 2em;
  display: inline-block;
  border: 0px;
  vertical-align: middle;
  color: ${(props: PageButtonProps) => (props.iscurrentpage ? '#FFF' : '#000')}
  ${(props: PageButtonProps) => (props.iscurrentpage ? 'background-color: #AAA' : '')}
  transition: background-color 0.25s, color 0.25s;
  cursor: pointer;
  :hover {
    background-color: #CCC;
  }
`;

export default function CommentNavigatorComponent({
  pageNumber,
  maxPageNumber,
  changePageNumber,
}: {
  pageNumber: number;
  maxPageNumber: number;
  changePageNumber: (pageNumber: number) => void;
}): JSX.Element {
  const start = (pageNumber > 4)
    ? pageNumber - 4
    : 1;
  const end = Math.min((pageNumber + 4), maxPageNumber);

  const pageButtonElements: JSX.Element[] = [];

  for (let i = start; i <= end; i += 1) {
    pageButtonElements.push(
      <PageButton
        iscurrentpage={i === pageNumber}
        key={`comment-navigator-page-button-${i}`}
        onClick={() => { changePageNumber(i); }}
      >
        {i}
      </PageButton>,
    );
  }

  return (
    <Container>
      <Wrapper>
        {pageButtonElements}
      </Wrapper>
    </Container>
  );
}
