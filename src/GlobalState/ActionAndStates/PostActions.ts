import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import { Query, Post } from '../../generated/graphqlQuery';
import convertPost from '../../converter/convertPost';
import { PostData } from '../../types/PostData';

async function loadPostBatch(postIds: number[]): Promise<PostData[]> {
  return Promise.all(postIds.map(async (postId) => {
    const query = Query
      .addPost(postId,
        Post
          .addContentS3Key());

    const { data } = await query.fetch();

    const response = await fetch(`http://localhost:9000/content-s3-bucket/${data.post.contentS3Key}`);

    // TODO: Check error
    const json = await response.json();

    return convertPost(json);
  }));
}

const postLoader = new DataLoader<number, PostData>(postIds => loadPostBatch(postIds));

const globalState = getGlobalState();

const PostActions = {
  async loadPost(postId: number): Promise<void> {
    const postData = await postLoader.load(postId);
    globalState.postState.posts[postId] = postData;
  },
};

export default PostActions;
