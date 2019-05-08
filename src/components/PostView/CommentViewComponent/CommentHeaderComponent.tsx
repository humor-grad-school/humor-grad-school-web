import React from 'react';
import styled, { css } from 'styled-components';
import { CommentInfo } from '../../../types/CommentData';
import getPassedTimeString from '../../../utils/getPassedTimeString';

type ContainerProps = {
  isPostWritersComment: boolean;
}

const Container = styled.div`
  display: flex;
  margin-bottom: 1ex;
  align-content: center;
  padding: 0.75em 0.5em;
  background-color: ${(props: ContainerProps) => (props.isPostWritersComment ? '#BBB' : '#DDD')};
  font-size: 1em;
`;

const Item = css`
  flex-wrap: wrap;
  margin-right: 1em;
`;

const Writer = styled.div`
  ${Item}
  display: flex;
  align-content: center;
`;

const Avartar = styled.img`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
`;

const Name = styled.div`
  display: block;
  line-height: 1;
`;

const PassedTime = styled.div`
  ${Item}
  line-height: 1;
  color: #888;
`;

export default function CommentHeaderComponent({
  commentInfo,
  postWriterId,
}: {
  commentInfo: CommentInfo;
  postWriterId: number;
}): JSX.Element {
  const {
    writer,
    createdAt,
  } = commentInfo;

  return (
    <Container isPostWritersComment={postWriterId === writer.id}>
      <Writer>
        <Avartar src={writer.avatarUrl} alt="" />
        <Name>{writer.username}</Name>
      </Writer>
      <PassedTime>{getPassedTimeString(createdAt)}</PassedTime>
    </Container>
  );
}
