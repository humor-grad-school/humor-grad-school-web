import { HgsRestApi } from '../../generated/client/ClientApis';

export async function uploadContentToS3(
  content: string,
): ReturnType<typeof HgsRestApi.requestPresignedPostFieldsForContent> {
  const response = await HgsRestApi.requestPresignedPostFieldsForContent();

  if (response.isSuccessful) {
    const formData = new FormData();

    Object.entries(response.data.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('key', response.data.key);
    formData.append('file', content);

    const fetchResponse = await fetch(response.data.url, {
      method: 'POST',
      body: formData,
    });

    if (!fetchResponse.ok) {
      throw new Error(`${fetchResponse.status} ${fetchResponse.statusText}`);
    }
  }

  return response;
}

export async function uploadMediaToS3(
  mediaBuffer: Blob,
): ReturnType<typeof HgsRestApi.requestPresignedPostFieldsForMedia> {
  const response = await HgsRestApi.requestPresignedPostFieldsForMedia();

  if (response.isSuccessful) {
    const s3Key = response.data.key;
    const formData = new FormData();

    Object.entries(response.data.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('key', s3Key);
    formData.append('file', mediaBuffer);

    const fetchResponse = await fetch(response.data.url, {
      method: 'POST',
      body: formData,
    });

    if (!fetchResponse.ok) {
      throw new Error(`${fetchResponse.status} ${fetchResponse.statusText}`);
    }

    await HgsRestApi.encodeMedia({ s3Key });
  }

  return response;
}
