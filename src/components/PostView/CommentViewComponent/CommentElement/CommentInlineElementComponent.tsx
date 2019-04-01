import React from 'react';
import { InlineElementData } from '../../../../types/CommentData';
import renderCommentContent from '../renderCommentContent';

export default function CommentInlineElementComponent({
  inlineElementData,
}: {
  inlineElementData: InlineElementData;
}): JSX.Element {
  const { children } = inlineElementData;
  return <span>{children ? renderCommentContent(children) : null}</span>;
}
