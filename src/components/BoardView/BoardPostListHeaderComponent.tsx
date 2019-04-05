import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0px;
  border-top: 1px solid #CCC;
  border-bottom: 1px solid #CCC;

  text-align: center;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
`;

const Id = styled.div`
  width: 32px;
`;

const Title = styled.div`
  width: 100%;
`;

const Writer = styled.div`
  width: 128px;
`;

const CreatedAt = styled.div`
  width: 64px;
`;

const Likes = styled.div`
  width: 32px;
`;


export default function BoardPostListHeaderComponent(): JSX.Element {
  return (
    <Container>
      <Id>번호</Id>
      <Title>제목</Title>
      <Writer>글쓴이</Writer>
      <CreatedAt>날짜</CreatedAt>
      <Likes>추신수</Likes>
    </Container>
  );
}
