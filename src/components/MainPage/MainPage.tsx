import React from 'react';
import styled from 'styled-components';
import FeedComponent from './Feed/FeedComponent';

const Container = styled.div`
  margin: 0 3em;
  max-width: 100%;
  padding: 2em 1em;
  justify-content: center;
  background-color: #EEE;
  display: flex;
  flex-flow: row wrap;
`;

export default function MainPage(): JSX.Element {
  return (
    <Container>
      <FeedComponent boardName="humor" />
      <FeedComponent boardName="humor" />
    </Container>
  );
}
