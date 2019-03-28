import {
  PuffBlot,
  PuffBlotType,
  PuffTextBlot,
  PuffImageBlot,
} from '../types/PuffBlots';
import {
  ContentElementData,
  TextElementData,
  ContentElementDataType,
  BlockElementData,
  BoldElementData,
  ItalicElementData,
  UnderlineElementData,
  ImageElementData,
  InlineElementData,
} from '../types/PostData';

export default function convertBlotToContent(blot: PuffBlot): ContentElementData {
  const blotType: PuffBlotType = blot.statics.blotName;

  const children: ContentElementData[] | undefined = [];
  if (blot.children) {
    blot.children.forEach((childBlot: PuffBlot) => {
      children.push(convertBlotToContent(childBlot));
    });
  }

  switch (blotType) {
    case PuffBlotType.Block: {
      const contentData: BlockElementData = {
        type: ContentElementDataType.Block,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case PuffBlotType.Bold: {
      const contentData: BoldElementData = {
        type: ContentElementDataType.Bold,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case PuffBlotType.Italic: {
      const contentData: ItalicElementData = {
        type: ContentElementDataType.Italic,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case PuffBlotType.Underline: {
      const contentData: UnderlineElementData = {
        type: ContentElementDataType.Underline,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case PuffBlotType.Text: {
      const { text } = (blot as PuffTextBlot);
      const contentData: TextElementData = {
        type: ContentElementDataType.Text,
        content: text,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case PuffBlotType.Image: {
      const { currentSrc } = (blot as PuffImageBlot).domNode;
      const contentData: ImageElementData = {
        type: ContentElementDataType.Image,
        source: currentSrc,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    default: {
      const contentData: InlineElementData = {
        type: ContentElementDataType.Inline,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }
  }
}
