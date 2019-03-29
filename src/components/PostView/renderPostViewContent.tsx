import React from 'react';
import {
  ContentData,
  ImageElementData,
  ContentElementDataType,
  TextElementData,
  BlockElementData,
  BoldElementData,
  ItalicElementData,
  UnderlineElementData,
} from '../../types/PostData';
import PostTextElementComponent from './PostElement/PostTextElementComponent';
import PostImageElementComponent from './PostElement/PostImageElementComponent';
import PostBlockElementComponent from './PostElement/PostBlockElementComponent';
import PostBoldElementComponent from './PostElement/PostBoldElementComponent';
import PostItalicElementComponent from './PostElement/PostItalicElementComponent';
import PostUnderlineElementComponent from './PostElement/PostUnderlineElementComponent';
import PostBreakElementComponent from './PostElement/PostBreakElementComponent';

export default function renderPostViewContent(
  contentData: ContentData,
): (JSX.Element | undefined)[] {
  const contentElements = contentData.map((contentElementData) => {
    switch (contentElementData.type) {
      case ContentElementDataType.Block: {
        const blockElementData = contentElementData as BlockElementData;
        const key = `post-block-element-${Math.random()}`;
        return (
          <PostBlockElementComponent
            key={key}
            blockElementData={blockElementData}
          />
        );
      }
      case ContentElementDataType.Bold: {
        const boldElementData = contentElementData as BoldElementData;
        const key = `post-bold-element-${Math.random()}`;
        return (
          <PostBoldElementComponent
            key={key}
            boldElementData={boldElementData}
          />
        );
      }
      case ContentElementDataType.Italic: {
        const italicElementData = contentElementData as ItalicElementData;
        const key = `post-italic-element-${Math.random()}`;
        return (
          <PostItalicElementComponent
            key={key}
            italicElementData={italicElementData}
          />
        );
      }
      case ContentElementDataType.Underline: {
        const underlineElementData = contentElementData as UnderlineElementData;
        const key = `post-underline-element-${Math.random()}`;
        return (
          <PostUnderlineElementComponent
            key={key}
            underlineElementData={underlineElementData}
          />
        );
      }
      case ContentElementDataType.Break: {
        const key = `post-text-element-${Math.random()}`;
        return (
          <PostBreakElementComponent key={key} />
        );
      }
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
