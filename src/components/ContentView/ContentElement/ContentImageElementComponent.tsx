import React from 'react';
import { ImageElementData } from '../../../contentConverter/ContentData';

export default function ContentImageElementComponent({
  imageElementData,
}: {
  imageElementData: ImageElementData;
}): JSX.Element {
  return (
    <img
      src={imageElementData.source}
      alt={imageElementData.fileName}
      title={imageElementData.fileName}
    />
  );
}
