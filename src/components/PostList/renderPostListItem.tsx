import React from 'react';
import { Posts } from '../../types/BoardData';
import PostListItemComponent from './PostListItemComponent';

export default function renderPostListItem(
  posts: Posts,
): (JSX.Element | undefined)[] {
  const contentElements = posts.map(post => (
    <PostListItemComponent
      key={`post-list-item-${post.title}-${post.createdAt}`}
      post={post}
    />
  ));

  return contentElements.reverse();
}
