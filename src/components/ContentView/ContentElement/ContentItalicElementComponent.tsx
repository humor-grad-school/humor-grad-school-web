import React from 'react';
import { ItalicElementData } from '../../../types/ContentData';
import renderContent, { RenderContentOptionObject, RenderContentCounter } from '../renderContent';

export default function ContentItalicElementComponent({
  option,
  counter,
  italicElementData,
}: {
  option: RenderContentOptionObject;
  counter: RenderContentCounter;
  italicElementData: ItalicElementData;
}): JSX.Element {
  const { children } = italicElementData;
  return <em>{children ? renderContent(children, counter, option) : null}</em>;
}
