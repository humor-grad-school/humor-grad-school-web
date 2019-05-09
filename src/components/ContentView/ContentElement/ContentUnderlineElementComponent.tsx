import React from 'react';
import { UnderlineElementData } from '../../../contentConverter/ContentData';
import renderContent, { RenderContentOptionObject, RenderContentCounter } from '../renderContent';

export default function ContentUnderlineElementComponent({
  option,
  counter,
  underlineElementData,
}: {
  option: RenderContentOptionObject;
  counter: RenderContentCounter;
  underlineElementData: UnderlineElementData;
}): JSX.Element {
  const { children } = underlineElementData;
  return <u>{children ? renderContent(children, counter, option) : null}</u>;
}
