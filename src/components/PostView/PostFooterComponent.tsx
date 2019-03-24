import React from 'react';
import './PostFooterComponent.scss';
import { HgsRestApi } from '../../generated/client/ClientApis';

type PostFooterComponentProps = {
  postId: number;
}

async function likePost(postId: number): Promise<void> {
  try {
    // TODO: Update global post state
    const data = await HgsRestApi.likePost({ postId });
    console.log(data);
  } catch (error) {
    // TODO
    switch (error.message) {
      case '401':
        alert('로그인 되지 않았습니다');
        break;

      default:
        alert('알 수 없는 오류가 발생했습니다');
    }
  }
}
// TODO: Display likes
export default function PostFooterComponent({ postId }: PostFooterComponentProps): JSX.Element {
  return (
    <div className="post-footer container">
      <button
        className="like-button"
        onClick={() => likePost(postId)}
        type="button"
      >
        오호홓 좋아요!
      </button>
    </div>
  );
}
