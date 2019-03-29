import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { PostData } from '../../types/PostData';

type PostHeaderComponentProps = {
  postData: PostData;
}

const Container = styled.div`
  margin-bottom: 8ex;

  a {
    text-decoration: none;
  }
`;

const Title = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.5em;

  a {
    font-weight: bold;
    color: #000;
    transition: color 0.25s;

    :hover {
      color: #777;
    }
  }
`;

const Info = styled.div`
  display: flex;
  align-content: center;
  padding: 0.75em 0.5em;
  background-color: #DDD;
  font-size: 1em;
  border-top-color: #444;
  border-top-style: solid;
  border-top-width: 2px;
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

const PostLink = styled.a`
  color: #888;
`;


// TODO: Fix bug on observer-proxy
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

// TODO: Replace writer's avatar to rank image
export default function PostHeaderComponent({ postData }: PostHeaderComponentProps): JSX.Element {
  const {
    id,
    title,
    writer,
    createdAt,
  } = postData;
  return (
    <Container>
      <Title>
        <Link to={`/post/${id}`}>{title}</Link>
      </Title>
      <Info>
        <Writer>
          <Avartar src={writer.avatarUrl} alt="" />
          <Name>{writer.username}</Name>
        </Writer>
        <PassedTime>{getPassedTimeInString(createdAt)}</PassedTime>
      </Info>
      <PostLink href={window.location.href}>{window.location.href}</PostLink>
    </Container>
  );
}
