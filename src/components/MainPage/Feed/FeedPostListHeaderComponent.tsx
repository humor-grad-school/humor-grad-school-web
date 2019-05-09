import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Board = styled.div`
  font-weight: bold;
  font-size: 1.75em;
  padding-bottom: 8px;
  border-bottom: 2px solid #777;

  a {
    text-decoration: none;
    color: #333;
    transition: color 0.25s;
  }

  a:hover {
    color: #777;
  }
`;

export default function FeedPostListHeaderComponent({
  boardName,
}: {
  boardName: string;
}): JSX.Element {
  return (
    <Board>
      <Link to={`/board/${boardName}`}>{ boardName }</Link>
    </Board>
  );
}
