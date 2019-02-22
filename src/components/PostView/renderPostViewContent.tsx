import React from 'react';
import './PostViewContent.scss';
import {
  ContentData,
  ImageElementData,
  ContentElementDataType,
  TextElementData,
} from '../../types/PostData';
import PostTextElementComponent from './PostTextElementComponent';
import PostImageElementComponent from './PostImageElementComponent';

export default function renderPostViewContent(
  contentData: ContentData,
): (JSX.Element | undefined)[] {
  const contentElements = contentData.map((contentElementData) => {
    switch (contentElementData.type) {
      case ContentElementDataType.Text: {
        const textElementData = contentElementData as TextElementData;
        const key = `post-text-element-${textElementData.content}`;
        return (
          <PostTextElementComponent
            key={key}
            textElementData={textElementData}
          />
        );
      }
      case ContentElementDataType.Image: {
        const imageElementData = contentElementData as ImageElementData;
        const key = `post-image-element-${imageElementData.source}`;
        return (
          <PostImageElementComponent
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
