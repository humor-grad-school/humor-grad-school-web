import React from 'react';
import { ImageElementData } from '../../../types/PostData';

export default function PostImageElementComponent({
  imageElementData,
}: {
  imageElementData: ImageElementData;
}): JSX.Element {
  return <img src={imageElementData.source} alt="" />;
}
