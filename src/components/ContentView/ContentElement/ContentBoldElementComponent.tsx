import React from 'react';
import { BoldElementData } from '../../../types/ContentData';
import renderContent from '../renderContent';

export default function ContentBoldElementComponent({
  boldElementData,
}: {
  boldElementData: BoldElementData;
}): JSX.Element {
  const { children } = boldElementData;
  return <strong>{children ? renderContent(children) : null}</strong>;
}
