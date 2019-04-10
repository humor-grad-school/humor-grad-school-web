import React from 'react';
import { UnderlineElementData } from '../../../types/ContentData';
import renderContent from '../renderContent';

export default function ContentUnderlineElementComponent({
  underlineElementData,
}: {
  underlineElementData: UnderlineElementData;
}): JSX.Element {
  const { children } = underlineElementData;
  return <u>{children ? renderContent(children) : null}</u>;
}
