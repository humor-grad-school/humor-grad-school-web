import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Post } from '../../types/BoardData';

const Container = styled.li`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #CCC;
  background-color: #EEE;
  transition: background-color 0.25s;

  :hover {
    background-color: #DDD;
  }
`;

const Tinny = css`
  font-size: 11px;
  text-align: center;
`;

const Item = css`
  padding: 4px;
  margin: auto 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Id = styled.div`
  ${Tinny}
  ${Item}
  width: 5%;
  max-width: 4em;
  font-size: 8px;
`;

const Title = styled.div`
  ${Item}
  font-size: 14px;
  cursor: pointer;

  a {
    :link {
      color: #000;
      text-decoration: none;
    }

    :visited {
      color: #AAA;
      text-decoration: none;
    }

    :hover {
      color: #777;
      text-decoration: underline;
    }

    :active {
      text-decoration: underline;
    }
  }
`;

const CommentCount = styled.span`
  ${Item}
  margin-left: 0.5em;
  font-size: 12px;
`;

const Writer = styled.div`
  ${Item}
  margin-left: auto;
  width: 20%;
  max-width: 6em;
  font-size: 14px;
`;

const CreatedAt = styled.div`
  ${Tinny}
  ${Item}
  width: 10%;
  max-width: 4em;
`;

const Likes = styled.div`
  ${Tinny}
  ${Item}
  width: 5%;
  max-width: 4em;
`;

// TODO: Fix observer-proxy
function getPassedTimeInString(createdAt: Date): string {
  // const passedMillis = Date.now() - createdAt.getTime();
  const passedMillis = Date.now() - new Date(createdAt).getTime();

  const second = Math.floor(passedMillis / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  if (day >= 30) return `${createdAt.getFullYear()}.${createdAt.getMonth()}.${createdAt.getDay()}`;
  if (day !== 0) return `${day} 일 전`;
  if (hour !== 0) return `${hour} 시간 전`;
  if (minute !== 0) return `${minute} 분 전`;
  return `${second} 초 전`;
}

export default function BoardPostElementComponent({
  post,
}: {
  post: Post;
}): JSX.Element {
  const {
    id,
    title,
    writer,
    likes,
    commentCount,
    createdAt,
  } = post;
  return (
    <Container>
      <Id>{id}</Id>
      <Title>
        <Link to={`/post/${id}`}>
          {title}
          <CommentCount>{commentCount}</CommentCount>
        </Link>
      </Title>
      <Writer>{writer.username}</Writer>
      <CreatedAt>{getPassedTimeInString(createdAt)}</CreatedAt>
      <Likes>{likes}</Likes>
    </Container>
  );
}
