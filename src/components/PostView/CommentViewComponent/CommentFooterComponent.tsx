import React from 'react';
import styled from 'styled-components';
import { CommentInfo } from '../../../types/CommentData';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import { ErrorCode } from '../../../generated/ErrorCode';
import LoginActions from '../../../GlobalState/ActionAndStates/LoginActions';

const Container = styled.div`
  text-align: right;
`;

const Button = styled.button`
  color: #FFF;
  border: 0px;
  border-radius: 1.5em;
  padding: 0.75em 1.5em;
  background-color: #777;
  transition: background-color 0.25s;
  cursor: pointer;

  &:hover {
    background-color: #888;
  }
`;

const Likes = styled.span`
  margin-left: 0.5em;
  color: #CCC;
`;

async function likeComment(commentId: number): Promise<void> {
  const response = await CommentActions.likeComment(commentId);

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

export default function CommentFooterComponent({
  commentInfo,
}: {
  commentInfo: CommentInfo;
}): JSX.Element {
  const {
    id,
    likes,
  } = commentInfo;

  return (
    <Container>
      <Button
        onClick={() => likeComment(id)}
        type="button"
      >
        좋아요!
        <Likes>{likes}</Likes>
      </Button>
    </Container>
  );
}
