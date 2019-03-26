import React from 'react';
import './BoardPostListFooterComponent.scss';
import BoardPageNavigatorComponent from './BoardPageNavigatorComponent';

export default function BoardPostListFooterComponent(info: {
  boardName: string;
  pageNumber: number;
}): JSX.Element {
  return (
    <div className="board-post-list-footer container">
      <BoardPageNavigatorComponent {...info} />
    </div>
  );
}
