import React from 'react';
import './BoardPageNavigatorComponent.scss';
import { Link } from 'react-router-dom';

export default function BoardPageNavigatorComponent({
  boardName,
  pageNumber,
}: {
  boardName: string;
  pageNumber: number;
}): JSX.Element {
  const start = (pageNumber > 4)
    ? pageNumber - 4
    : 1;
  const end = pageNumber + 4;

  const pageButtonElements: JSX.Element[] = [];

  for (let i = start; i <= end; i += 1) {
    pageButtonElements.push(
      <Link
        className={`page-button ${(i === pageNumber) ? 'current' : ''}`}
        key={`board-page-navigator-page-button-${i}`}
        to={`/board/${boardName}/${i}`}
      >
        {i}
      </Link>,
    );
  }

  return (
    <div className="board-page-navigator container">
      {pageButtonElements}
    </div>
  );
}
