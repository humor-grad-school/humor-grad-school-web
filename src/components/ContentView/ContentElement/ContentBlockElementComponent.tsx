import React from 'react';
import { BlockElementData } from '../../../types/ContentData';
import renderContent, { RenderContentOptionObject, RenderContentCounter } from '../renderContent';

export default function ContentBlockElementComponent({
  option,
  counter,
  blockElementData,
}: {
  option: RenderContentOptionObject;
  counter: RenderContentCounter;
  blockElementData: BlockElementData;
}): JSX.Element {
  const { children } = blockElementData;
  return <p>{children ? renderContent(children, counter, option) : null}</p>;
}
