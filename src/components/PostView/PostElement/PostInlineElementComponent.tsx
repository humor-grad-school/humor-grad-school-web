import React from 'react';
import { InlineElementData } from '../../../types/PostData';
import renderPostViewContent from '../renderPostViewContent';

export default function PostInlineElementComponent({
  inlineElementData,
}: {
  inlineElementData: InlineElementData;
}): JSX.Element {
  const { children } = inlineElementData;
  return <span>{children ? renderPostViewContent(children) : null}</span>;
}
