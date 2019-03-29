import React from 'react';
import {
  TextElementData,
} from '../../../types/PostData';

export default function PostTextElementComponent({
  textElementData,
}: {
  textElementData: TextElementData;
}): JSX.Element {
  return <span>{textElementData.content}</span>;
}
