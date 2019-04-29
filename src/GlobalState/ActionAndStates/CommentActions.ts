import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import convertComment from '../../converter/convertComment';
import { CommentData, CommentInfoes, CommentInfo } from '../../types/CommentData';
import { HgsRestApi } from '../../generated/client/ClientApis';
import { unconfirmedBlot } from '../../types/Blot';
import { uploadContentToS3 } from './ContentActions';
import { convertContentData } from '../../converter/convertContent';
import convertBlotsToContentData from '../../converter/convertBlotsToContentData';
import LoginActions from './LoginActions';

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
      if (error.message === '401') LoginActions.openOverlay();
    }
  },

  async writeComment(contentInBlots: unconfirmedBlot[], postId: number, parentCommentId?: number) {
    const postContentData = await convertBlotsToContentData(contentInBlots);
    const postContentDataInYml = convertContentData(postContentData);
    const contentS3Key = await uploadContentToS3(postContentDataInYml);
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
