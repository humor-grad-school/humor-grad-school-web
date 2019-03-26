import React from 'react';
import './BoardPostListHeaderComponent.scss';

export default function BoardPostListHeaderComponent(): JSX.Element {
  return (
    <div className="board-post-list-header container">
      <div className="id">
        번호
      </div>
      <div className="title">
        제목
      </div>
      <div className="writer">
        글쓴이
      </div>
      <div className="created-at">
        날짜
      </div>
      <div className="likes">
        추신수
      </div>
    </div>
  );
}
