import { HgsRestApi } from '../../generated/client/ClientApis';

export async function uploadContentToS3(content: string): Promise<string> {
  const {
    isSuccessful,
    errorCode,
    data,
  } = await HgsRestApi.requestPresignedPostFieldsForContent();

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
  formData.append('file', content);

  await fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response: Response) => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    });

  return s3Key;
}

export async function uploadMediaToS3(mediaBuffer: Blob): Promise<string> {
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
