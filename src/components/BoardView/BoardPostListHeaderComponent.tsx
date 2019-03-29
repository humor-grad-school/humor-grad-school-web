import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  border-top: 1px solid #CCC;
  border-bottom: 1px solid #CCC;

  text-align: center;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
`;

const Id = styled.div`
  width: 5%;
  max-width: 4em;
`;

const Title = styled.div`
  width: 60%;
`;

const Writer = styled.div`
  margin-left: auto;
  max-width: 6em;
  width: 20%;
`;

const CreatedAt = styled.div`
  max-width: 4em;
  width: 10%;
`;

const Likes = styled.div`
  max-width: 4em;
  width: 5%;
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
