import React from 'react';
import styled from 'styled-components';
import renderPostListItem from './renderPostListItem';
import { Post } from '../../types/BoardData';

const Container = styled.ol`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

export default function PostListComponent({
  posts,
}: {
  posts: Post[];
}): JSX.Element {
  return <Container>{renderPostListItem(posts)}</Container>;
}
