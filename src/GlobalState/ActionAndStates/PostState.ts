import { PostData } from './PostActions';

export interface PostState {
  posts: PostData[];
}

export const initialPostState: PostState = {
  posts: [],
};
