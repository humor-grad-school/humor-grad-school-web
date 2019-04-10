import React from 'react';
import { ItalicElementData } from '../../../types/ContentData';
import renderContent from '../renderContent';

export default function ContentItalicElementComponent({
  italicElementData,
}: {
  italicElementData: ItalicElementData;
}): JSX.Element {
  const { children } = italicElementData;
  return <em>{children ? renderContent(children) : null}</em>;
}
