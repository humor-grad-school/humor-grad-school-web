import React from 'react';
import { UnderlineElementData } from '../../../types/PostData';
import renderPostViewContent from '../renderPostViewContent';

export default function PostUnderlineElementComponent({
  underlineElementData,
}: {
  underlineElementData: UnderlineElementData;
}): JSX.Element {
  const { children } = underlineElementData;
  return <u>{children ? renderPostViewContent(children) : null}</u>;
}
