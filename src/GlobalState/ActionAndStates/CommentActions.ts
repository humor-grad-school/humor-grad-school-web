import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import convertComment from '../../converter/convertComment';
import { CommentData, CommentInfoes, CommentInfo } from '../../types/CommentData';
import { HgsRestApi } from '../../generated/client/ClientApis';
import { convertBlotsToContentData, convertContentData } from '../../converter/convertPost';
import { unconfirmedBlot } from '../../types/Blot';

async function loadCommentBatch(commentInfoes: CommentInfoes): Promise<CommentData[]> {
  return Promise.all(commentInfoes.map(async (commentInfo) => {
    const response = await fetch(`http://localhost:9000/content-s3-bucket/${commentInfo.contentS3Key}`);

    const contentDataInYml = await response.text();

    return convertComment(commentInfo, contentDataInYml);
  }));
}

// TODO: Make custom alert?
function alertError(errorCode: string): void {
  switch (errorCode) {
    case '401':
      alert('로그인 되지 않았습니다');
      break;

    default:
      alert('알 수 없는 오류가 발생했습니다');
  }
}

async function uploadContent(content: string): Promise<string> {
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

const commentLoader = new DataLoader<CommentInfo, CommentData>(
  commentInfo => loadCommentBatch(commentInfo),
);

const globalState = getGlobalState();

const CommentActions = {
  async loadComment(commentInfo: CommentInfo): Promise<void> {
    const { id } = commentInfo;
    const commentData = await commentLoader.load(commentInfo);
    globalState.commentState.comments[id] = commentData;
  },

  async likeComment(commentId: number): Promise<void> {
    try {
      const data = await HgsRestApi.likeComment({ commentId });
      // TODO: Is isSuccessful false? Is it possible?
      if (!data.isSuccessful) return;
      globalState.commentState.comments[commentId].likes += 1;
    } catch (error) {
      alertError(error.message);
    }
  },

  async writeComment(contentInBlots: unconfirmedBlot[], postId: number, parentCommentId?: string) {
    const postContentData = await convertBlotsToContentData(contentInBlots);
    const postContentDataInYml = convertContentData(postContentData);
    const contentS3Key = await uploadContent(postContentDataInYml);
    // TODO: Check error if needed
    const response = parentCommentId
      ? await HgsRestApi.writeSubComment({
        parentCommentId,
        contentS3Key,
        postId,
      })
      : await HgsRestApi.writeComment({
        contentS3Key,
        postId,
      });

    return response.isSuccessful
      ? response.data.commentId
      : -1;
  },
};

export default CommentActions;
