import React from 'react';
import { BoldElementData } from '../../../contentConverter/ContentData';
import renderContent, { RenderContentOptionObject, RenderContentCounter } from '../renderContent';

export default function ContentBoldElementComponent({
  option,
  counter,
  boldElementData,
}: {
  option: RenderContentOptionObject;
  counter: RenderContentCounter;
  boldElementData: BoldElementData;
}): JSX.Element {
  const { children } = boldElementData;
  return <strong>{children ? renderContent(children, counter, option) : null}</strong>;
}
