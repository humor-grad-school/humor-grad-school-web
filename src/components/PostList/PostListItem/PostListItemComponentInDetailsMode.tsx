import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import getPassedTimeString from '../../../utils/getPassedTimeString';
import { BoardPostData } from '../../../GlobalState/ActionAndStates/BoardActions';

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
  width: 32px;
  font-size: 8px;
`;

const Title = styled.div`
  ${Item}
  width: 100%;
  font-size: 14px;
  cursor: pointer;

  a {
    :link {
      width: 100%;
      display: inline-block;
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
  width: 128px;
  font-size: 14px;
`;

const CreatedAt = styled.div`
  ${Tinny}
  ${Item}
  width: 64px;
`;

const Likes = styled.div`
  ${Tinny}
  ${Item}
  width: 32px;
`;

export default function PostListItemComponentInDetailsMode({
  post,
}: {
  post: BoardPostData;
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
      <CreatedAt>{getPassedTimeString(createdAt)}</CreatedAt>
      <Likes>{likes}</Likes>
    </Container>
  );
}
