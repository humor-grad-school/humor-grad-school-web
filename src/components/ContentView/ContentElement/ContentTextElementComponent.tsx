import React from 'react';
import { TextElementData } from '../../../types/ContentData';

export default function ContentTextElementComponent({
  textElementData,
}: {
  textElementData: TextElementData;
}): JSX.Element {
  return <span>{textElementData.content}</span>;
}
