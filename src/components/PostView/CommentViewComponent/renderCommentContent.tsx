import React from 'react';
import {
  ContentData,
  ImageElementData,
  ContentElementDataType,
  TextElementData,
  BlockElementData,
} from '../../../types/CommentData';
import CommentBlockElementComponent from './CommentElement/CommentBlockElementComponent';
import CommentBreakElementComponent from './CommentElement/CommentBreakElementComponent';
import CommentTextElementComponent from './CommentElement/CommentTextElementComponent';
import CommentImageElementComponent from './CommentElement/CommentImageElementComponent';

export default function renderCommentContent(
  contentData: ContentData,
): (JSX.Element | undefined)[] {
  const contentElements = contentData.map((contentElementData) => {
    switch (contentElementData.type) {
      case ContentElementDataType.Block: {
        const blockElementData = contentElementData as BlockElementData;
        const key = `post-block-element-${Math.random()}`;
        return (
          <CommentBlockElementComponent
            key={key}
            blockElementData={blockElementData}
          />
        );
      }
      case ContentElementDataType.Break: {
        const key = `post-text-element-${Math.random()}`;
        return (
          <CommentBreakElementComponent key={key} />
        );
      }
      case ContentElementDataType.Text: {
        const textElementData = contentElementData as TextElementData;
        const key = `post-text-element-${textElementData.content}`;
        return (
          <CommentTextElementComponent
            key={key}
            textElementData={textElementData}
          />
        );
      }
      case ContentElementDataType.Image: {
        const imageElementData = contentElementData as ImageElementData;
        const key = `post-image-element-${imageElementData.source}`;
        return (
          <CommentImageElementComponent
            key={key}
            imageElementData={imageElementData}
          />
        );
      }
      default:
        return undefined;
    }
  });

  return contentElements;
}
