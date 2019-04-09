import React from 'react';
import styled, { css } from 'styled-components';
import { CommentInfo } from '../../../types/CommentData';

type ContainerProps = {
  ispostwriter: 'true' | 'false';
}

const Container = styled.div`
  display: flex;
  margin-bottom: 1ex;
  align-content: center;
  padding: 0.75em 0.5em;
  background-color: ${(props: ContainerProps) => ((props.ispostwriter === 'true') ? '#BBB' : '#DDD')};
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

function getShortDateString(date: Date): string {
  // return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`;
  const date1 = new Date(date);
  return `${date1.getFullYear()}.${date1.getMonth()}.${date1.getDay()}`;
}

// TODO: Fix bug on observer-proxy
function getPassedTimeInString(createdAt: Date): string {
  // const passedMillis = Date.now() - createdAt.getTime();
  const passedMillis = Date.now() - new Date(createdAt).getTime();

  const second = Math.floor(passedMillis / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  if (day >= 30) return getShortDateString(createdAt);
  if (day !== 0) return `${day} 일 전`;
  if (hour !== 0) return `${hour} 시간 전`;
  if (minute !== 0) return `${minute} 분 전`;
  return `${second} 초 전`;
}

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
    <Container ispostwriter={(postWriterId === writer.id) ? 'true' : 'false'}>
      <Writer>
        <Avartar src={writer.avatarUrl} alt="" />
        <Name>{writer.username}</Name>
      </Writer>
      <PassedTime>{getPassedTimeInString(createdAt)}</PassedTime>
    </Container>
  );
}
