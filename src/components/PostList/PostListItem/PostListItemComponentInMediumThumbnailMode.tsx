import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import getPassedTimeString from '../../../utils/getPassedTimeString';
import { BoardPostData } from '../../../GlobalState/ActionAndStates/BoardActions';

const Container = styled.li`
  border-bottom: 1px solid #CCC;
  background-color: #EEE;
  transition: background-color 0.25s;

  :hover {
    background-color: #DDD;
  }
`;

const LinkWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 64px calc(100% - 64px - 64px - 64px) 64px 64px;
  cursor: pointer;

  :any-link {
    :link {
      width: 100%;
      color: #000;
      text-decoration: none;
    }

    :visited {
      color: #AAA;
    }

    :hover {
      color: #777;
    }
  }
`;

const Thumbnail = styled.img`
  grid-column: 1 / 1;
  grid-row: 1 / 3;
  width: 64px;
  height: 64px;
`;

const Item = css`
  padding: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: auto 0px;
`;

const Title = styled.div`
  ${Item}
  width: 100%;
  font-size: 14px;
  grid-column: 2 / 4;
  grid-row: 1 / 1;
`;

const CommentCount = styled.span`
  ${Item}
  margin-left: 0.5em;
  font-size: 12px;
  grid-column: 4 / 4;
  grid-row: 1 / 1;
`;

const Writer = styled.div`
  ${Item}
  grid-column: 2 / 2;
  grid-row: 2 / 2;
`;

const CreatedAt = styled.div`
  ${Item}
  grid-column: 3 / 3;
  grid-row: 2 / 2;
  font-size: 10px;
`;

const Likes = styled.div`
  ${Item}
  grid-column: 4 / 4;
  grid-row: 2 / 2;
  font-size: 10px;
`;

export default function PostListItemComponentInMediumThumbnailMode({
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
    thumbnailUrl,
    createdAt,
  } = post;

  return (
    <Container>
      <LinkWrapper to={`/post/${id}`}>
        <Thumbnail src={thumbnailUrl} alt="" />
        <Title>{title}</Title>
        <CommentCount>{`[${commentCount}]`}</CommentCount>
        <Writer>{writer.username}</Writer>
        <CreatedAt>{getPassedTimeString(createdAt)}</CreatedAt>
        <Likes>{`추${likes}`}</Likes>
      </LinkWrapper>
    </Container>
  );
}
