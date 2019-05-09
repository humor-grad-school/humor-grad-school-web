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
} from '../../contentConverter/ContentData';
import ContentBlockElementComponent from './ContentElement/ContentBlockElementComponent';
import ContentInlineElementComponent from './ContentElement/ContentInlineElementComponent';
import ContentBoldElementComponent from './ContentElement/ContentBoldElementComponent';
import ContentItalicElementComponent from './ContentElement/ContentItalicElementComponent';
import ContentUnderlineElementComponent from './ContentElement/ContentUnderlineElementComponent';
import ContentBreakElementComponent from './ContentElement/ContentBreakElementComponent';
import ContentTextElementComponent from './ContentElement/ContentTextElementComponent';
import ContentImageElementComponent from './ContentElement/ContentImageElementComponent';

type renderContentOption = {
  maxImage?: number;
}

export class RenderContentOptionObject {
  public readonly maxImage: number;

  public constructor(_option?: renderContentOption) {
    const option = _option || {};

    this.maxImage = option.maxImage || -1;
  }
}

export class RenderContentCounter {
  private imageCount = 0;

  public get image(): number {
    return this.imageCount;
  }

  public increaseImage(): void {
    this.imageCount += 1;
  }
}

export default function renderContent(
  contentData: ContentData,
  counter: RenderContentCounter,
  option: RenderContentOptionObject,
): (JSX.Element | undefined)[] {
  const contentElements = contentData.map((contentElementData) => {
    switch (contentElementData.type) {
      case ContentElementDataType.Block: {
        const blockElementData = contentElementData as BlockElementData;
        const key = `content-block-element-${Math.random()}`;
        return (
          <ContentBlockElementComponent
            key={key}
            option={option}
            counter={counter}
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
            option={option}
            counter={counter}
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
            option={option}
            counter={counter}
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
            option={option}
            counter={counter}
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
            option={option}
            counter={counter}
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

        if (option.maxImage >= 0 && counter.image >= option.maxImage) {
          return undefined;
        }
        counter.increaseImage();

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

export function startRenderContent(
  content: ContentData,
  option?: renderContentOption,
): (JSX.Element | undefined)[] {
  const optionObject = new RenderContentOptionObject(option);
  const counter = new RenderContentCounter();
  return renderContent(content, counter, optionObject);
}
