import React from 'react';
import { Posts } from '../../types/BoardData';
import PostListItemComponentInDetailsMode from './PostListItem/PostListItemComponentInDetailsMode';
import PostListItemComponentInMediumThumbnailMode from './PostListItem/PostListItemComponentInMediumThumbnailMode';

export enum PostListViewMode {
  Details = 'details',
  MediumThumbnail = 'mediumThumbnail',
}

function getBasePostListItem(viewMode: PostListViewMode) {
  switch (viewMode) {
    case PostListViewMode.MediumThumbnail: {
      return PostListItemComponentInMediumThumbnailMode;
    }

    default: {
      return PostListItemComponentInDetailsMode;
    }
  }
}

export default function renderPostListItem(
  posts: Posts,
  viewMode: PostListViewMode,
): (JSX.Element | undefined)[] {
  const BasePostListItem = getBasePostListItem(viewMode);

  const contentElements = posts.map(post => (
    <BasePostListItem
      key={`post-list-item-${post.title}-${post.createdAt}`}
      post={post}
    />
  ));

  return contentElements;
}
