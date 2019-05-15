import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import { HgsRestApi } from '../../generated/client/ClientApis';
import convertContent from '../../contentConverter/convertContent';
import { ContentData } from '../../contentConverter/ContentData';
import { GraphQLQueryType, User, Comment } from '../../generated/graphqlQuery';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function generateCommentQuery() {
  return Comment
    .addId()
    .addWriter(
      User
        .addId()
        .addUsername()
        .addAvatarUrl(),
    )
    .addParentComment(
      Comment
        .addId()
        .addWriter(
          User
            .addUsername(),
        ),
    )
    .addContentS3Key()
    .addLikes()
    .addCreatedAt();
}

type CommentDataWithoutContent = GraphQLQueryType<ReturnType<typeof generateCommentQuery>>

export type CommentData = CommentDataWithoutContent & {
  content: ContentData;
}

async function loadCommentBatch(contentS3Keys: string[]): Promise<ContentData[]> {
  return Promise.all(contentS3Keys.map(async (contentS3Key) => {
    const response = await fetch(`http://localhost:9000/content-s3-bucket/${contentS3Key}`);

    const contentDataInYml = await response.text();

    return convertContent(contentDataInYml);
  }));
}

const commentContentLoader = new DataLoader<string, ContentData>(
  commentData => loadCommentBatch(commentData),
);

const globalState = getGlobalState();

const CommentActions = {
  async saveCommentDataWithContent(
    commentDataWithoutContent: CommentDataWithoutContent,
  ): Promise<CommentData> {
    const commentContentData = await commentContentLoader
      .load(commentDataWithoutContent.contentS3Key);

    const commentData = {
      ...commentDataWithoutContent,
      content: commentContentData,
    };

    globalState.commentState.comments[commentData.id] = {
      ...commentData,
      content: commentContentData,
    };

    return commentData;
  },

  async likeComment(commentId: number): ReturnType<typeof HgsRestApi.likeComment> {
    const response = await HgsRestApi.likeComment({ commentId });

    if (response.isSuccessful) {
      globalState.postState.posts.forEach((post) => {
        const targetComment = post.comments.find(comment => comment.id === commentId);

        if (!targetComment) {
          return;
        }

        targetComment.likes += 1;
      });
    }

    return response;
  },

  async writeComment(
    contentS3Key: string,
    postId: number,
  ): ReturnType<typeof HgsRestApi.writeComment> {
    const response = await HgsRestApi.writeComment({
      contentS3Key,
      postId,
    });

    return response;
  },

  async writeSubComment(
    contentS3Key: string,
    postId: number,
    parentCommentId: number,
  ): ReturnType<typeof HgsRestApi.writeSubComment> {
    const response = await HgsRestApi.writeSubComment({
      parentCommentId,
      contentS3Key,
      postId,
    });

    return response;
  },
};

export default CommentActions;
