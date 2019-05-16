import {
  ContentElementData,
  BlockElementData,
  ContentElementDataType,
  BoldElementData,
  ItalicElementData,
  UnderlineElementData,
  BreakElementData,
  TextElementData,
  ImageElementData,
  InlineElementData,
  ContentData,
} from './ContentData';
import { BlotType, UnconfirmedBlot } from './Blot';
import TextBlot from '../blots/TextBlot';
import ContainerBlot from '../blots/ContainerBlot';
import ImageBlot, { ImageBlotValue } from '../blots/ImageBlot';
import EmbedBlot from '../blots/EmbedBlot';

function convertBlotToContent(blot: UnconfirmedBlot): ContentElementData {
  const blotType: BlotType = blot.statics.blotName;

  const children: ContentElementData[] = [];
  if ((blot as ContainerBlot).children) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (blot as ContainerBlot).children.forEach((childBlot: any) => {
      children.push(convertBlotToContent(childBlot));
    });
  }

  switch (blotType) {
    case BlotType.Block: {
      const contentData: BlockElementData = {
        type: ContentElementDataType.Block,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }

    case BlotType.Bold: {
      const contentData: BoldElementData = {
        type: ContentElementDataType.Bold,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }

    case BlotType.Italic: {
      const contentData: ItalicElementData = {
        type: ContentElementDataType.Italic,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }

    case BlotType.Underline: {
      const contentData: UnderlineElementData = {
        type: ContentElementDataType.Underline,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }

    case BlotType.Break: {
      const contentData: BreakElementData = {
        type: ContentElementDataType.Break,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }

    case BlotType.Text: {
      const text = (blot as TextBlot).value();
      const contentData: TextElementData = {
        type: ContentElementDataType.Text,
        content: text,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }

    case BlotType.Image: {
      const { image: imageValue } = (blot as ImageBlot).value() as { image: ImageBlotValue };
      const contentData: ImageElementData = {
        type: ContentElementDataType.Image,
        source: imageValue.url,
        fileName: imageValue.alt,
        encodingUrlPromise: imageValue.encodingUrlPromise,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }

    default: {
      const contentData: InlineElementData = {
        type: ContentElementDataType.Inline,
      };
      if (children.length) {
        contentData.children = children;
      }
      return contentData;
    }
  }
}

export default function convertBlotsToContentData(blots: EmbedBlot[]): ContentData {
  const contentData: ContentData = [];

  blots.forEach((blot) => {
    contentData.push(convertBlotToContent(blot));
  });

  return contentData;
}
