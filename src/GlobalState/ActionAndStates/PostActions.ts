import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import {
  Query,
  Post,
  User,
  Board,
} from '../../generated/graphqlQuery';
import convertPost, { convertBlotsToContentData, convertContentData } from '../../converter/convertPost';
import { PostData } from '../../types/PostData';
import { PuffBlot } from '../../types/PuffBlots';
import { HgsRestApi } from '../../generated/client/ClientApis';

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
              .addUsername()
              .addAvatarUrl(),
          )
          .addBoard(
            Board
              .addId()
              .addName(),
          )
          .addLikes()
          .addIsLiked()
          .addCreatedAt());

    const { data } = await query.fetch();

    const response = await fetch(`http://localhost:9000/content-s3-bucket/${data.post.contentS3Key}`);

    const contentDataInYml = await response.text();

    return convertPost(data.post, contentDataInYml);
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

const postLoader = new DataLoader<number, PostData>(postIds => loadPostBatch(postIds));

const globalState = getGlobalState();

const PostActions = {
  async loadPost(postId: number): Promise<void> {
    const postData = await postLoader.load(postId);
    globalState.postState.posts[postId] = postData;
  },

  async likePost(postId: number): Promise<void> {
    try {
      const data = await HgsRestApi.likePost({ postId });
      // TODO: Is isSuccessful false? Is it possible?
      if (!data.isSuccessful) return;
      globalState.postState.posts[postId].isLiked = true;
      globalState.postState.posts[postId].likes += 1;
    } catch (error) {
      alertError(error.message);
    }
  },

  async writePost(contentInBlots: PuffBlot[]): Promise<void> {
    const postContentData = await convertBlotsToContentData(contentInBlots);
    const postContentDataInYml = convertContentData(postContentData);
    // TODO: send it to s3
    console.log(postContentDataInYml);
  },
};

export default PostActions;
