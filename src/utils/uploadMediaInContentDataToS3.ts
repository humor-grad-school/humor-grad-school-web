import {
  ContentData,
  ContentElementData,
  ContentElementDataType,
  ImageElementData,
} from '../contentConverter/ContentData';
import { uploadMediaToS3 } from '../GlobalState/ActionAndStates/ContentActions';

function uploadMediaInContentDataToS3(
  contentElementData: ContentElementData,
  mediaUploadingPromises: ReturnType<typeof uploadMediaToS3>[],
): ContentElementData {
  switch (contentElementData.type) {
    case ContentElementDataType.Image: {
      const blobUrl = (contentElementData as ImageElementData).source;
      const imageUploadingPromise = fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => uploadMediaToS3(blob))
        .then((response) => {
          if (response.isSuccessful) {
            // eslint-disable-next-line no-param-reassign
            (contentElementData as ImageElementData).source = `http://localhost:9000/after-encoding-s3-bucket/${response.data.key}.jpg`;
          }
          return response;
        });

      mediaUploadingPromises.push(imageUploadingPromise);
      break;
    }

    default: {
      break;
    }
  }

  if (contentElementData.children) {
    // eslint-disable-next-line no-param-reassign
    contentElementData.children = contentElementData.children.map(childContentElementData =>
      uploadMediaInContentDataToS3(childContentElementData, mediaUploadingPromises));
  }

  return contentElementData;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function startUploadMediaInContentDataToS3(content: ContentData) {
  const mediaUploadingPromises: ReturnType<typeof uploadMediaToS3>[] = [];
  const mediaUploadedContentData = content.map(contentElement =>
    uploadMediaInContentDataToS3(contentElement, mediaUploadingPromises));

  const responses = await Promise.all(mediaUploadingPromises);

  return {
    mediaUploadedContentData,
    responses,
  };
}
