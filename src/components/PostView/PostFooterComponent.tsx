import React from 'react';
import './PostFooterComponent.scss';
import { PostData } from '../../types/PostData';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';

type PostFooterComponentProps = {
  postData: PostData;
}

// TODO: Display likes
export default function PostFooterComponent({ postData }: PostFooterComponentProps): JSX.Element {
  const {
    id,
    likes,
    isLiked,
  } = postData;
  return (
    <div className="post-footer container">
      <button
        className={`like-button ${isLiked ? '' : 'active'}`}
        onClick={() => { if (!isLiked) PostActions.likePost(id); }}
        type="button"
      >
        {isLiked ? '좋아했습니다?' : '좋아요!'}
        <span className="likes">{likes}</span>
      </button>
    </div>
  );
}
