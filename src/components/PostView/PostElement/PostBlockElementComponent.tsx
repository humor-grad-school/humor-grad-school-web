import React from 'react';
import { BlockElementData } from '../../../types/PostData';
import renderPostViewContent from '../renderPostViewContent';

export default function PostBlockElementComponent({
  blockElementData,
}: {
  blockElementData: BlockElementData;
}): JSX.Element {
  const { children } = blockElementData;
  return <p>{children ? renderPostViewContent(children) : null}</p>;
}
