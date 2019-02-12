import React from 'react';
import './Feeds.css';
import thumbnailExample from './thumbnailExample.jpg';

function generatorRandomString(minLength: number, maxLength: number): string {
  const length = Math.floor(Math.random() * (maxLength - minLength) + minLength);
  let randomString = '';
  for (let i = 0; i < length; i += 1) {
    randomString += Math.random().toString(36).substr(2, 1);
  }
  return randomString;
}

function FeedTableRow(): JSX.Element {
  const title = `Korea Gov Block Https!?${generatorRandomString(3, 30)}`;
  const commentCounts = Math.floor(Math.random() * 1000);
  const titleElement = (
    <span>
      <div className="feed-title">{title}</div>
      <span className="comment-counts">
        [
        {commentCounts}
        ]
      </span>
    </span>
  );

  return (
    <tr>
      <td className="thumbnail-column"><img className="thumbnail-img" src={thumbnailExample} alt="thumbnail" /></td>
      <td className="title-column">{titleElement}</td>
    </tr>
  );
}

export default function Feeds(): JSX.Element {
  const feedTableRows: JSX.Element[] = [];

  for (let i = 0; i < 5; i += 1) {
    feedTableRows.push(<FeedTableRow />);
  }

  return (
    <div className="feed-container">
      <div className="header">
        Best Posts
      </div>
      <table>
        {feedTableRows}
      </table>
    </div>
  );
}
