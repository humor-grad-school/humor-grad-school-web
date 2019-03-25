import React from 'react';
import { Link } from 'react-router-dom';
import './PostHeaderComponent.scss';
import { PostData } from '../../types/PostData';

type PostHeaderComponentProps = {
  postData: PostData;
}

function getPassedTimeInString(createdAtInMillis: number): string {
  const passedMillis = Date.now() - createdAtInMillis;
  const createdAt = new Date(createdAtInMillis);

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

// TODO: Replace writer's avatar to rank image
export default function PostHeaderComponent({ postData }: PostHeaderComponentProps): JSX.Element {
  const {
    id,
    title,
    writer,
    createdAtInMillis,
  } = postData;
  return (
    <div className="post-header container">
      <div className="title">
        <Link to={`/post/${id}`}>
          {title}
        </Link>
      </div>
      <div className="info">
        <div className="writer item">
          <img
            className="avatar"
            src={writer.avatarUrl}
            alt=""
          />
          <div className="name">
            {writer.username}
          </div>
        </div>
        <div className="passed-time item">
          {getPassedTimeInString(createdAtInMillis)}
        </div>
      </div>
      <a
        className="post-link"
        href={window.location.href}
      >
        {window.location.href}
      </a>
    </div>
  );
}
