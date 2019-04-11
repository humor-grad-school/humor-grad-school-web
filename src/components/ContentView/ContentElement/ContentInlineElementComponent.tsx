import React from 'react';
import { InlineElementData } from '../../../types/ContentData';
import renderContent, { RenderContentOptionObject, RenderContentCounter } from '../renderContent';

export default function ContentInlineElementComponent({
  option,
  counter,
  inlineElementData,
}: {
  option: RenderContentOptionObject;
  counter: RenderContentCounter;
  inlineElementData: InlineElementData;
}): JSX.Element {
  const { children } = inlineElementData;
  return <span>{children ? renderContent(children, counter, option) : null}</span>;
}
