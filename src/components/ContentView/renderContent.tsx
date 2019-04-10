import React from 'react';
import {
  ContentData,
  ContentElementDataType,
  BlockElementData,
  InlineElementData,
  BoldElementData,
  ItalicElementData,
  UnderlineElementData,
  TextElementData,
  ImageElementData,
} from '../../types/ContentData';
import ContentBlockElementComponent from './ContentElement/ContentBlockElementComponent';
import ContentInlineElementComponent from './ContentElement/ContentInlineElementComponent';
import ContentBoldElementComponent from './ContentElement/ContentBoldElementComponent';
import ContentItalicElementComponent from './ContentElement/ContentItalicElementComponent';
import ContentUnderlineElementComponent from './ContentElement/ContentUnderlineElementComponent';
import ContentBreakElementComponent from './ContentElement/ContentBreakElementComponent';
import ContentTextElementComponent from './ContentElement/ContentTextElementComponent';
import ContentImageElementComponent from './ContentElement/ContentImageElementComponent';

export default function renderContent(
  contentData: ContentData,
): (JSX.Element | undefined)[] {
  const contentElements = contentData.map((contentElementData) => {
    switch (contentElementData.type) {
      case ContentElementDataType.Block: {
        const blockElementData = contentElementData as BlockElementData;
        const key = `content-block-element-${Math.random()}`;
        return (
          <ContentBlockElementComponent
            key={key}
            blockElementData={blockElementData}
          />
        );
      }
      case ContentElementDataType.Inline: {
        const inlineElementData = contentElementData as InlineElementData;
        const key = `content-block-element-${Math.random()}`;
        return (
          <ContentInlineElementComponent
            key={key}
            inlineElementData={inlineElementData}
          />
        );
      }
      case ContentElementDataType.Bold: {
        const boldElementData = contentElementData as BoldElementData;
        const key = `content-bold-element-${Math.random()}`;
        return (
          <ContentBoldElementComponent
            key={key}
            boldElementData={boldElementData}
          />
        );
      }
      case ContentElementDataType.Italic: {
        const italicElementData = contentElementData as ItalicElementData;
        const key = `content-italic-element-${Math.random()}`;
        return (
          <ContentItalicElementComponent
            key={key}
            italicElementData={italicElementData}
          />
        );
      }
      case ContentElementDataType.Underline: {
        const underlineElementData = contentElementData as UnderlineElementData;
        const key = `content-underline-element-${Math.random()}`;
        return (
          <ContentUnderlineElementComponent
            key={key}
            underlineElementData={underlineElementData}
          />
        );
      }
      case ContentElementDataType.Break: {
        const key = `content-text-element-${Math.random()}`;
        return (
          <ContentBreakElementComponent key={key} />
        );
      }
      case ContentElementDataType.Text: {
        const textElementData = contentElementData as TextElementData;
        const key = `content-text-element-${textElementData.content}`;
        return (
          <ContentTextElementComponent
            key={key}
            textElementData={textElementData}
          />
        );
      }
      case ContentElementDataType.Image: {
        const imageElementData = contentElementData as ImageElementData;
        const key = `content-image-element-${imageElementData.source}`;
        return (
          <ContentImageElementComponent
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
