import React from 'react';
import { BlockElementData } from '../../../../types/CommentData';
import renderCommentContent from '../renderCommentContent';

export default function CommentBlockElementComponent({
  blockElementData,
}: {
  blockElementData: BlockElementData;
}): JSX.Element {
  const { children } = blockElementData;
  return <p>{children ? renderCommentContent(children) : null}</p>;
}
