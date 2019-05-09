import React from 'react';
import styled from 'styled-components';
import PostActions, { PostData } from '../../GlobalState/ActionAndStates/PostActions';
import { ErrorCode } from '../../generated/ErrorCode';
import LoginActions from '../../GlobalState/ActionAndStates/LoginActions';

type PostFooterComponentProps = {
  postData: PostData;
}

type LikeButtonProps = {
  isLiked: boolean;
}

const Container = styled.div`
  margin: 4ex 0px;
  border-bottom: 1px solid #CCC;
  padding-bottom: 4ex;
  text-align: center;
`;

const LikeButton = styled.button`
  color: #FFF;
  border: 0px;
  border-radius: 1.5em;
  padding: 0.75em 1.5em;
  background-color: #777;
  transition: background-color 0.25s;

  ${(props: LikeButtonProps) => (props.isLiked
    ? ''
    : `
      cursor: pointer;
      &:hover {
        background-color: #888;
      }`
  )}
`;

const Likes = styled.span`
  margin-left: 0.5em;
  color: #CCC;
`;

async function likePost(postId: number): Promise<void> {
  const response = await PostActions.likePost(postId);
  if (response.isSuccessful) {
    return;
  }

  switch (response.errorCode) {
    case ErrorCode.DefaultErrorCode.Unauthenticated: {
      alert('로그인이 필요해요');
      LoginActions.openOverlay();
      break;
    }

    default: {
      alert('알 수 없는 에러로 실패했어요');
      break;
    }
  }
}

export default function PostFooterComponent({ postData }: PostFooterComponentProps): JSX.Element {
  const {
    id,
    likes,
    isLiked,
  } = postData;
  return (
    <Container>
      <LikeButton
        isLiked={isLiked}
        onClick={() => (isLiked ? null : likePost(id))}
        type="button"
      >
        {isLiked ? '좋아했습니다?' : '좋아요!'}
        <Likes>{likes}</Likes>
      </LikeButton>
    </Container>
  );
}
