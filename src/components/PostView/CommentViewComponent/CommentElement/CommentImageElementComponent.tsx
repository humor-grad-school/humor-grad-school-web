import React from 'react';
import { ImageElementData } from '../../../../types/CommentData';

export default function CommentImageElementComponent({
  imageElementData,
}: {
  imageElementData: ImageElementData;
}): JSX.Element {
  return <img src={imageElementData.source} alt="" />;
}
