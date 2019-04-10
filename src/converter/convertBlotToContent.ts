import {
  PuffBlot,
  PuffBlotType,
  PuffTextBlot,
  PuffImageBlot,
} from '../types/PuffBlots';
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
} from '../types/ContentData';
import { HgsRestApi } from '../generated/client/ClientApis';

function convertBase64ToBlob(base64: string): Blob {
  const [
    header,
    data,
  ] = base64.split(',');

  const type = header.slice(5, -7);
  const byteCharacters = atob(data);

  const byteNumbers = [];
  for (let i = 0; i < byteCharacters.length; i += 1) {
    byteNumbers.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type });
  return blob;
}

async function uploadMedia(mediaBuffer: Blob): Promise<string> {
  const {
    isSuccessful,
    errorCode,
    data,
  } = await HgsRestApi.requestPresignedPostFieldsForMedia();

  // TODO: Check error if needed
  if (!isSuccessful) throw new Error(errorCode);
  const {
    fields,
    key: s3Key,
    url,
  } = data;

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('key', s3Key);
  formData.append('file', mediaBuffer);

  await fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response: Response) => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    });

  await HgsRestApi.encodeMedia({ s3Key });

  return s3Key;
}

export default async function convertBlotToContentAndUploadMedia(blot: PuffBlot):
Promise<ContentElementData> {
  const blotType: PuffBlotType = blot.statics.blotName;

  const childAppendingPromises: Promise<ContentElementData>[] = [];
  if (blot.children) {
    blot.children.forEach((childBlot: PuffBlot) => {
      childAppendingPromises.push(convertBlotToContentAndUploadMedia(childBlot));
    });
  }

  const children = await Promise.all(childAppendingPromises);

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

    case PuffBlotType.Break: {
      const contentData: BreakElementData = {
        type: ContentElementDataType.Break,
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
      const blob = convertBase64ToBlob(currentSrc);
      const imageS3Key = await uploadMedia(blob);

      const contentData: ImageElementData = {
        type: ContentElementDataType.Image,
        // TODO: Change s3 url
        source: `http://localhost:9000/after-encoding-s3-bucket/${imageS3Key}.jpg`,
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
