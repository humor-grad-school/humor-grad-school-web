import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import {
  Query,
  Post,
  User,
  Board,
  GraphQLQueryType,
} from '../../generated/graphqlQuery';
import { HgsRestApi } from '../../generated/client/ClientApis';
import convertContent from '../../contentConverter/convertContent';
import { ContentData } from '../../contentConverter/ContentData';
import sortComments from '../../utils/sortComments';
import CommentActions, { CommentData, generateCommentQuery } from './CommentActions';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function generatePostQuery(postId: number) {
  return Query
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
          generateCommentQuery(),
        )
        .addIsLiked()
        .addCreatedAt());
}

type PostGraphQlResult = GraphQLQueryType<ReturnType<typeof generatePostQuery>>

export type PostData = PostGraphQlResult['post'] & {
  content: ContentData;
  comments: CommentData[];
}

async function loadPostBatch(postIds: number[]): Promise<PostData[]> {
  return Promise.all(postIds.map(async (postId) => {
    const query = generatePostQuery(postId);

    const { data } = await query.fetch();

    const comments = await Promise.all(data.post.comments.map(comment =>
      CommentActions.saveCommentDataWithContent(comment)));

    const response = await fetch(`http://localhost:9000/content-s3-bucket/${data.post.contentS3Key}`);

    const contentDataInYml = await response.text();
    return {
      ...data.post,
      comments: sortComments(comments),
      content: convertContent(contentDataInYml),
    };
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
    contentS3Key: string,
    boardName: string,
  ): ReturnType<typeof HgsRestApi.writePost> {
    const response = await HgsRestApi.writePost({
      title,
      contentS3Key,
      boardName,
    });

    return response;
  },
};

export default PostActions;
