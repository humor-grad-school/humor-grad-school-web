import React from 'react';
import './PostBoldElementComponent.scss';
import { BoldElementData } from '../../../types/PostData';
import renderPostViewContent from '../renderPostViewContent';

export default function PostBoldElementComponent({
  boldElementData,
}: {
  boldElementData: BoldElementData;
}): JSX.Element {
  const { children } = boldElementData;
  return <strong>{children ? renderPostViewContent(children) : null}</strong>;
}
