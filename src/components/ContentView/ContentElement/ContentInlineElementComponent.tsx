import React from 'react';
import { InlineElementData } from '../../../types/ContentData';
import renderContent from '../renderContent';

export default function ContentInlineElementComponent({
  inlineElementData,
}: {
  inlineElementData: InlineElementData;
}): JSX.Element {
  const { children } = inlineElementData;
  return <span>{children ? renderContent(children) : null}</span>;
}
