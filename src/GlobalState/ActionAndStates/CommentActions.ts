import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import convertComment from '../../converter/convertComment';
import { CommentData, CommentInfoes, CommentInfo } from '../../types/CommentData';
import { HgsRestApi } from '../../generated/client/ClientApis';
import { unconfirmedBlot } from '../../types/Blot';
import { uploadContentToS3 } from './ContentActions';
import { convertContentData } from '../../converter/convertContent';
import convertBlotsToContentData from '../../converter/convertBlotsToContentData';

async function loadCommentBatch(commentInfoes: CommentInfoes): Promise<CommentData[]> {
  return Promise.all(commentInfoes.map(async (commentInfo) => {
    const response = await fetch(`http://localhost:9000/content-s3-bucket/${commentInfo.contentS3Key}`);

    const contentDataInYml = await response.text();

    return convertComment(commentInfo, contentDataInYml);
  }));
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

  async likeComment(commentId: number): ReturnType<typeof HgsRestApi.likeComment> {
    const response = await HgsRestApi.likeComment({ commentId });
    if (response.isSuccessful) {
      globalState.commentState.comments[commentId].likes += 1;
    }

    return response;
  },

  async writeComment(
    contentInBlots: unconfirmedBlot[],
    postId: number,
  ): ReturnType<typeof HgsRestApi.writeComment> {
    const postContentData = await convertBlotsToContentData(contentInBlots);
    const postContentDataInYml = convertContentData(postContentData);
    const uploadContentToS3Response = await uploadContentToS3(postContentDataInYml);

    if (!uploadContentToS3Response.isSuccessful) {
      throw uploadContentToS3Response.errorCode;
    }

    const contentS3Key = uploadContentToS3Response.data.key;

    const response = await HgsRestApi.writeComment({
      contentS3Key,
      postId,
    });

    return response;
  },

  async writeSubComment(
    contentInBlots: unconfirmedBlot[],
    postId: number,
    parentCommentId: number,
  ): ReturnType<typeof HgsRestApi.writeSubComment> {
    const postContentData = await convertBlotsToContentData(contentInBlots);
    const postContentDataInYml = convertContentData(postContentData);
    const uploadContentToS3Response = await uploadContentToS3(postContentDataInYml);

    if (!uploadContentToS3Response.isSuccessful) {
      throw uploadContentToS3Response.errorCode;
    }

    const contentS3Key = uploadContentToS3Response.data.key;

    const response = await HgsRestApi.writeSubComment({
      parentCommentId,
      contentS3Key,
      postId,
    });

    return response;
  },
};

export default CommentActions;
