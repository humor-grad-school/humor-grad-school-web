import React from 'react';
import { Posts } from '../../types/BoardData';
import BoardPostListItemComponent from './BoardPostListItemComponent';

export default function renderPostViewContent(
  posts: Posts,
): (JSX.Element | undefined)[] {
  const contentElements = posts.map(post => (
    <BoardPostListItemComponent
      key={post.title}
      post={post}
    />
  ));

  return contentElements;
}
