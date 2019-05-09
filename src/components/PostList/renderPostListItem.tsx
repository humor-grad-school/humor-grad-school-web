import React from 'react';
import PostListItemComponentInDetailsMode from './PostListItem/PostListItemComponentInDetailsMode';
import PostListItemComponentInMediumThumbnailMode from './PostListItem/PostListItemComponentInMediumThumbnailMode';
import { BoardPostData } from '../../GlobalState/ActionAndStates/BoardActions';

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
  posts: BoardPostData[],
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
