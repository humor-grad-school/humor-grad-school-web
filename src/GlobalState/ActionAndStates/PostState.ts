import { PostData } from '../../types/PostData';

export interface PostState {
  posts: PostData[];
}

export const initialPostState: PostState = {
  posts: [],
};
