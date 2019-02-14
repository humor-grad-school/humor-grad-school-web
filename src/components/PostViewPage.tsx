import React from 'react';
import './PostViewPage.scss';


function convertContentToJsxElements(content: string): (string | JSX.Element)[] {
  return content.split(/\r\n|\n|\r/g).reduce((prev, line) => ([
    ...prev,
    <br />,
    line,
  ]), [] as (string | JSX.Element)[]);
}

export default function PostViewPage(): JSX.Element {
  const content = `i am body. put contents her

  asdf


  asdf

  asdf

  asdf
  asdfasdfasdfad
  sfads
  fads
  fasd
  fasdfadsfdasfadsfsafadsfdas
  fad
  sfdasfasdfdasfasdfadsfadsfasdfsde`;
  const ContentElements = convertContentToJsxElements(content);
  return (
    <div className="post-view-page container">
      <div className="header">i am header. put title here</div>
      <div className="body">{ContentElements}</div>
    </div>
  );
}
