import React from 'react';
import {
  TextElementData,
} from '../../../../types/CommentData';

export default function CommentTextElementComponent({
  textElementData,
}: {
  textElementData: TextElementData;
}): JSX.Element {
  return <span>{textElementData.content}</span>;
}
