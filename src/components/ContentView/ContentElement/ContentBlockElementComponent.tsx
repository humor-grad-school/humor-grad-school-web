import React from 'react';
import { BlockElementData } from '../../../types/ContentData';
import renderContent from '../renderContent';

export default function ContentBlockElementComponent({
  blockElementData,
}: {
  blockElementData: BlockElementData;
}): JSX.Element {
  const { children } = blockElementData;
  return <p>{children ? renderContent(children) : null}</p>;
}
