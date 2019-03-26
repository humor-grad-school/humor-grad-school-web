import React from 'react';
import './BoardPostListItemComponent.scss';
import { Link } from 'react-router-dom';
import { Post } from '../../types/BoardData';

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
    <li className="board-post-list-item container">
      <div className="id tinny item">
        {id}
      </div>
      <div className="title item">
        <Link to={`/post/${id}`}>
          {title}
          <span className="comment-count item">
            {commentCount}
          </span>
        </Link>
      </div>
      <div className="writer item">
        {writer.username}
      </div>
      <div className="created-at tinny item">
        {getPassedTimeInString(createdAt)}
      </div>
      <div className="likes tinny item">
        {likes}
      </div>
    </li>
  );
}
