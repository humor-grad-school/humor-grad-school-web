import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import {
  Query,
  Post,
  User,
  Board,
  Comment,
} from '../../generated/graphqlQuery';
import convertPost from '../../converter/convertPost';
import { PostData } from '../../types/PostData';
import { HgsRestApi } from '../../generated/client/ClientApis';
import { unconfirmedBlot } from '../../types/Blot';
import { uploadContentToS3 } from './ContentActions';
import { convertContentData } from '../../converter/convertContent';
import convertBlotsToContentData from '../../converter/convertBlotsToContentData';

async function loadPostBatch(postIds: number[]): Promise<PostData[]> {
  return Promise.all(postIds.map(async (postId) => {
    const query = Query
      .addPost(postId,
        Post
          .addId()
          .addTitle()
          .addContentS3Key()
          .addWriter(
            User
              .addId()
              .addUsername()
              .addAvatarUrl(),
          )
          .addBoard(
            Board
              .addName(),
          )
          .addLikes()
          .addComments(
            Comment
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
              .addCreatedAt(),
          )
          .addIsLiked()
          .addCreatedAt());

    const { data } = await query.fetch();

    const response = await fetch(`http://localhost:9000/content-s3-bucket/${data.post.contentS3Key}`);

    const contentDataInYml = await response.text();
    return convertPost(data.post, contentDataInYml);
  }));
}

const postLoader = new DataLoader<number, PostData>(postIds => loadPostBatch(postIds));

const globalState = getGlobalState();

const PostActions = {
  async loadPost(postId: number): Promise<void> {
    const postData = await postLoader.load(postId);
    globalState.postState.posts[postId] = postData;
  },

  async reloadPost(postId: number): Promise<void> {
    postLoader.clear(postId);
    await PostActions.loadPost(postId);
  },

  async likePost(postId: number): ReturnType<typeof HgsRestApi.likePost> {
    const response = await HgsRestApi.likePost({ postId });

    if (response.isSuccessful) {
      globalState.postState.posts[postId].isLiked = true;
      globalState.postState.posts[postId].likes += 1;
    }

    return response;
  },

  async writePost(
    title: string,
    contentInBlots: unconfirmedBlot[],
    boardName: string,
  ): ReturnType<typeof HgsRestApi.writePost> {
    const postContentData = await convertBlotsToContentData(contentInBlots);
    const postContentDataInYml = convertContentData(postContentData);
    const uploadContentToS3Response = await uploadContentToS3(postContentDataInYml);

    if (!uploadContentToS3Response.isSuccessful) {
      throw uploadContentToS3Response.errorCode;
    }

    const contentS3Key = uploadContentToS3Response.data.key;

    const response = await HgsRestApi.writePost({
      title,
      contentS3Key,
      boardName,
    });

    return response;
  },
};

export default PostActions;
