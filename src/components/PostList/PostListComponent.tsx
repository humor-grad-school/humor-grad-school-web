import React from 'react';
import styled from 'styled-components';
import renderPostListItem, { PostListViewMode } from './renderPostListItem';
import { BoardPostData } from '../../GlobalState/ActionAndStates/BoardActions';

const Container = styled.ol`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

export default function PostListComponent({
  posts,
  postLimit = Infinity,
  viewMode = PostListViewMode.Details,
}: {
  posts: BoardPostData[];
  postLimit?: number;
  viewMode?: PostListViewMode;
}): JSX.Element {
  const limitedPosts = posts.length > postLimit
    ? posts.slice(0, postLimit)
    : posts;

  return (
    <Container>
      {renderPostListItem(limitedPosts, viewMode)}
    </Container>
  );
}
