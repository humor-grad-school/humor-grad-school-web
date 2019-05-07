import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { PostData } from '../../types/PostData';
import getPassedTimeString from '../../utils/getPassedTimeString';

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
        <PassedTime>{getPassedTimeString(createdAt)}</PassedTime>
      </Info>
      <PostLink href={window.location.href}>{window.location.href}</PostLink>
    </Container>
  );
}
