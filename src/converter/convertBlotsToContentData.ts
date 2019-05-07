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
} from '../types/ContentData';
import { BlotType, unconfirmedBlot } from '../types/Blot';
import TextBlot from '../blots/TextBlot';
import ContainerBlot from '../blots/ContainerBlot';
import ImageBlot, { ImageBlotValue } from '../blots/ImageBlot';
import { uploadMediaToS3 } from '../GlobalState/ActionAndStates/ContentActions';

async function convertBlotToContentAndUploadMedia(blot: unconfirmedBlot):
Promise<ContentElementData> {
  const blotType: BlotType = blot.statics.blotName;

  const childAppendingPromises: Promise<ContentElementData>[] = [];
  if ((blot as ContainerBlot).children) {
    (blot as ContainerBlot).children.forEach((childBlot: any) => {
      childAppendingPromises.push(convertBlotToContentAndUploadMedia(childBlot));
    });
  }

  const children = await Promise.all(childAppendingPromises);

  switch (blotType) {
    case BlotType.Block: {
      const contentData: BlockElementData = {
        type: ContentElementDataType.Block,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case BlotType.Bold: {
      const contentData: BoldElementData = {
        type: ContentElementDataType.Bold,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case BlotType.Italic: {
      const contentData: ItalicElementData = {
        type: ContentElementDataType.Italic,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case BlotType.Underline: {
      const contentData: UnderlineElementData = {
        type: ContentElementDataType.Underline,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case BlotType.Break: {
      const contentData: BreakElementData = {
        type: ContentElementDataType.Break,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case BlotType.Text: {
      const text = (blot as TextBlot).value();
      const contentData: TextElementData = {
        type: ContentElementDataType.Text,
        content: text,
      };
      if (children.length) contentData.children = children;
      return contentData;
    }

    case BlotType.Image: {
      const { image: imageValue } = (blot as ImageBlot).value() as { image: ImageBlotValue };
      const blob = await fetch(imageValue.url).then(response => response.blob());
      const uploadMediaToS3Response = await uploadMediaToS3(blob);

      if (!uploadMediaToS3Response.isSuccessful) {
        throw uploadMediaToS3Response.errorCode;
      }

      const imageS3Key = uploadMediaToS3Response.data.key;

      const contentData: ImageElementData = {
        type: ContentElementDataType.Image,
        // TODO: Change s3 url
        source: `http://localhost:9000/after-encoding-s3-bucket/${imageS3Key}.jpg`,
        fileName: imageValue.alt,
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

export default async function convertBlotsToContentData(
  blots: unconfirmedBlot[],
): Promise<ContentData> {
  const blotConvertingPromises: Promise<ContentElementData>[] = [];

  blots.forEach(async (blot) => {
    blotConvertingPromises.push(convertBlotToContentAndUploadMedia(blot));
  });

  const contentData: ContentData = await Promise.all(blotConvertingPromises);
  return contentData;
}
