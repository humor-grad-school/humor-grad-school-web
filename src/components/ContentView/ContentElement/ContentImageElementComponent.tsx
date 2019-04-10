import React from 'react';
import { ImageElementData } from '../../../types/ContentData';

export default function ContentImageElementComponent({
  imageElementData,
}: {
  imageElementData: ImageElementData;
}): JSX.Element {
  return <img src={imageElementData.source} alt="" />;
}
